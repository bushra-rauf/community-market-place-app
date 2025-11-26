'use server'

import { createClient } from "@/utils/supabase/server-client"
import { revalidatePath } from "next/cache"

export const deleteComment = async (commentId: string) => {
    const supabase = await createClient()

    // Get authenticated user
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
        throw new Error("You must be logged in to delete comments")
    }

    // Get the comment with post information
    const { data: comment, error: commentError } = await supabase
        .from('comments')
        .select(`
            id,
            user_id,
            post_id,
            posts!inner (
                user_id,
                slug
            )
        `)
        .eq('id', commentId)
        .single()

    if (commentError || !comment) {
        throw new Error("Comment not found")
    }

    // Check permissions: user owns the comment OR user owns the post
    const isCommentOwner = comment.user_id === user.id
    const isPostOwner = (comment.posts as any).user_id === user.id

    if (!isCommentOwner && !isPostOwner) {
        throw new Error("You don't have permission to delete this comment")
    }

    // Delete the comment (cascade will handle replies if RLS allows)
    const { error: deleteError } = await supabase
        .from('comments')
        .delete()
        .eq('id', commentId)

    if (deleteError) {
        throw new Error(`Failed to delete comment: ${deleteError.message}`)
    }

    // Revalidate to show updated comments
    revalidatePath(`/${(comment.posts).slug}`)

    return { success: true }
}
