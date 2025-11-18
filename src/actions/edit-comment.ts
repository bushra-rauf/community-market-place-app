'use server'

import z from "zod"
import { editCommentSchema } from "./schemas"
import { createClient } from "@/utils/supabase/server-client"
import { revalidatePath } from "next/cache"

export const editComment = async ({
    commentId,
    content
}: {
    commentId: string
    content: string
}) => {
    // Validate input
    const parsedData = editCommentSchema.parse({ content })

    const supabase = await createClient()

    // Get authenticated user
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
        throw new Error("You must be logged in to edit comments")
    }

    // Get the comment to verify ownership
    const { data: comment, error: commentError } = await supabase
        .from('comments')
        .select('*')
        .eq('id', commentId)
        .single()

    if (commentError || !comment) {
        throw new Error("Comment not found")
    }

    // Verify user owns the comment
    if (user.id !== comment.user_id) {
        throw new Error("You can only edit your own comments")
    }

    // Update the comment
    const { data: updatedComment, error: updateError } = await supabase
        .from('comments')
        .update({
            content: parsedData.content,
            updated_at: new Date().toISOString()
        })
        .eq('id', commentId)
        .select()
        .single()

    if (updateError) {
        throw new Error(`Failed to update comment: ${updateError.message}`)
    }

    // Revalidate the page
    revalidatePath('/')

    return updatedComment
}
