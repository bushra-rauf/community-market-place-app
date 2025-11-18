'use server'

import { createClient } from "@/utils/supabase/server-client"

export interface CommentWithUser {
    id: string
    content: string
    created_at: string
    updated_at: string
    post_id: number
    user_id: string
    parent_comment_id: string | null
    users: {
        username: string
    } | null
    replies?: CommentWithUser[]
}

export const getComments = async (postId: number): Promise<CommentWithUser[]> => {
    const supabase = await createClient()

    const { data, error } = await supabase
        .from('comments')
        .select(`
            id,
            content,
            created_at,
            updated_at,
            post_id,
            user_id,
            parent_comment_id,
            users (
                username
            )
        `)
        .eq('post_id', postId)
        .order('created_at', { ascending: true })

    if (error) {
        throw new Error(`Failed to fetch comments: ${error.message}`)
    }

    // Build nested comment structure
    const commentsMap = new Map<string, CommentWithUser>()
    const rootComments: CommentWithUser[] = []

    // First pass: create map of all comments
    data.forEach((comment: any) => {
        commentsMap.set(comment.id, {
            ...comment,
            replies: []
        })
    })

    // Second pass: build hierarchy
    data.forEach((comment: any) => {
        const commentWithReplies = commentsMap.get(comment.id)!

        if (comment.parent_comment_id) {
            // This is a reply, add it to parent's replies
            const parent = commentsMap.get(comment.parent_comment_id)
            if (parent) {
                parent.replies!.push(commentWithReplies)
            }
        } else {
            // This is a root comment
            rootComments.push(commentWithReplies)
        }
    })

    return rootComments
}

export const getCommentCount = async (postId: number): Promise<number> => {
    const supabase = await createClient()

    const { count, error } = await supabase
        .from('comments')
        .select('*', { count: 'exact', head: true })
        .eq('post_id', postId)

    if (error) {
        throw new Error(`Failed to fetch comment count: ${error.message}`)
    }

    return count || 0
}
