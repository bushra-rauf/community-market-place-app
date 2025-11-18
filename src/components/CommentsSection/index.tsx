'use client'

import { useQuery } from "@tanstack/react-query"
import { getComments, CommentWithUser } from "@/actions/get-comments"
import CommentForm from "@/components/CommentForm"
import CommentItem from "@/components/CommentItem"
import { MessageSquare, Loader2 } from "lucide-react"

interface CommentsSectionProps {
    postId: number
    postAuthorId: string
    currentUserId?: string
    initialComments?: CommentWithUser[]
}

const CommentsSection = ({
    postId,
    postAuthorId,
    currentUserId,
    initialComments = []
}: CommentsSectionProps) => {
    const {
        data: comments,
        isLoading,
        error
    } = useQuery({
        queryKey: ['comments', postId],
        queryFn: () => getComments(postId),
        initialData: initialComments,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        staleTime: 30000 // Consider data fresh for 30 seconds
    })

    const totalComments = comments?.reduce((count, comment) => {
        return count + 1 + (comment.replies?.length || 0)
    }, 0) || 0

    return (
        <div className="w-full max-w-4xl mx-auto mt-8 px-4">
            {/* Header */}
            <div className="flex items-center justify-between mb-6 pb-4 border-b-2 border-gray-200">
                <div className="flex items-center gap-2">
                    <MessageSquare className="text-gray-600" size={24} />
                    <h2 className="text-xl md:text-2xl font-bold text-gray-900">
                        Comments
                    </h2>
                    <span className="text-sm md:text-base text-gray-500 font-medium">
                        ({totalComments})
                    </span>
                </div>
            </div>

            {/* Comment Form - Only for authenticated users */}
            {currentUserId ? (
                <div className="mb-8">
                    <CommentForm postId={postId} />
                </div>
            ) : (
                <div className="mb-8 p-4 bg-gray-50 border border-gray-200 rounded-lg text-center">
                    <p className="text-gray-600">
                        Please log in to leave a comment.
                    </p>
                </div>
            )}

            {/* Loading State */}
            {isLoading && (
                <div className="flex justify-center items-center py-12">
                    <Loader2 className="animate-spin text-blue-600" size={32} />
                </div>
            )}

            {/* Error State */}
            {error && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-red-800 text-sm">
                        Failed to load comments. Please try again later.
                    </p>
                </div>
            )}

            {/* Comments List */}
            {!isLoading && !error && (
                <div className="space-y-1">
                    {comments && comments.length > 0 ? (
                        comments.map((comment) => (
                            <CommentItem
                                key={comment.id}
                                comment={comment}
                                postId={postId}
                                currentUserId={currentUserId}
                                postAuthorId={postAuthorId}
                            />
                        ))
                    ) : (
                        <div className="text-center py-12">
                            <MessageSquare className="mx-auto mb-4 text-gray-300" size={48} />
                            <p className="text-gray-500 text-lg">
                                No comments yet. Be the first to comment!
                            </p>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}

export default CommentsSection
