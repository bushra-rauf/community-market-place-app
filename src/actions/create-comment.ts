'use server'

import z from "zod"
import { commentSchema } from "./schemas"
import { createClient } from "@/utils/supabase/server-client"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export const createComment = async (commentData: z.infer<typeof commentSchema>) => {
    // Validate input
    const parsedData = commentSchema.parse(commentData)

    const supabase = await createClient()

    // Get authenticated user
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
        throw new Error("You must be logged in to comment")
    }

    // Verify post exists
    const { data: post, error: postError } = await supabase
        .from('posts')
        .select('id, slug')
        .eq('id', parsedData.postId)
        .single()

    if (postError || !post) {
        throw new Error("Post not found")
    }

    // If this is a reply, verify parent comment exists
    if (parsedData.parentCommentId) {
        const { data: parentComment, error: parentError } = await supabase
            .from('comments')
            .select('id, post_id')
            .eq('id', parsedData.parentCommentId)
            .single()

        if (parentError || !parentComment) {
            throw new Error("Parent comment not found")
        }

        // Ensure parent comment belongs to the same post
        if (parentComment.post_id !== parsedData.postId) {
            throw new Error("Parent comment does not belong to this post")
        }
    }

    // Insert comment
    const { data: newComment, error: insertError } = await supabase
        .from('comments')
        .insert({
            content: parsedData.content,
            post_id: parsedData.postId,
            user_id: user.id,
            parent_comment_id: parsedData.parentCommentId || null
        })
        .select()
        .single()

    if (insertError) {
        throw new Error(`Failed to create comment: ${insertError.message}`)
    }

    // Revalidate the post page to show new comment
    revalidatePath(`/${post.slug}`)

    return newComment
}
