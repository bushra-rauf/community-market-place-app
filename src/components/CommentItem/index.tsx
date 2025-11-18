'use client'

import { useState } from "react"
import { CommentWithUser } from "@/actions/get-comments"
import { deleteComment } from "@/actions/delete-comment"
import { editComment } from "@/actions/edit-comment"
import { formatRelativeTime } from "@/utils/format-relative-time"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { MessageCircle, Trash2, User, Edit2, X, Check } from "lucide-react"
import CommentForm from "@/components/CommentForm"

interface CommentItemProps {
    comment: CommentWithUser
    postId: number
    currentUserId?: string
    postAuthorId?: string
    depth?: number
}

const CommentItem = ({
    comment,
    postId,
    currentUserId,
    postAuthorId,
    depth = 0
}: CommentItemProps) => {
    const [showReplyForm, setShowReplyForm] = useState(false)
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
    const [isEditing, setIsEditing] = useState(false)
    const [editContent, setEditContent] = useState(comment.content)
    const queryClient = useQueryClient()

    const isCommentOwner = currentUserId === comment.user_id
    const isPostOwner = currentUserId === postAuthorId
    const canDelete = isCommentOwner || isPostOwner
    const canEdit = isCommentOwner

    const deleteMutation = useMutation({
        mutationFn: deleteComment,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['comments', postId] })
            queryClient.invalidateQueries({ queryKey: ['comment-count', postId] })
            toast.success("Comment deleted successfully")
            setShowDeleteConfirm(false)
        },
        onError: (error: Error) => {
            toast.error(error.message || "Failed to delete comment")
        }
    })

    const editMutation = useMutation({
        mutationFn: (data: { commentId: string; content: string }) => editComment(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['comments', postId] })
            toast.success("Comment updated successfully")
            setIsEditing(false)
        },
        onError: (error: Error) => {
            toast.error(error.message || "Failed to update comment")
        }
    })

    const handleDelete = () => {
        deleteMutation.mutate(comment.id)
    }

    const handleEdit = () => {
        if (editContent.trim() === comment.content.trim()) {
            setIsEditing(false)
            return
        }
        editMutation.mutate({ commentId: comment.id, content: editContent })
    }

    const handleCancelEdit = () => {
        setEditContent(comment.content)
        setIsEditing(false)
    }

    // Limit nesting depth for better UX
    const maxDepth = 3
    const isMaxDepth = depth >= maxDepth

    return (
        <div className={`${depth > 0 ? 'ml-8 md:ml-12' : ''}`}>
            <div className="flex gap-3 py-4">
                {/* Avatar */}
                <div className="flex-shrink-0">
                    <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-semibold">
                        {comment.users?.username ? (
                            comment.users.username.charAt(0).toUpperCase()
                        ) : (
                            <User size={16} />
                        )}
                    </div>
                </div>

                {/* Comment Content */}
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold text-sm md:text-base text-gray-900">
                            {comment.users?.username || 'Unknown User'}
                        </span>
                        <span className="text-xs md:text-sm text-gray-500">
                            {formatRelativeTime(comment.created_at)}
                        </span>
                    </div>

                    {/* Comment Content or Edit Form */}
                    {isEditing ? (
                        <div className="mb-2">
                            <textarea
                                value={editContent}
                                onChange={(e) => setEditContent(e.target.value)}
                                className="w-full px-3 py-2 text-sm md:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                                rows={3}
                                disabled={editMutation.isPending}
                            />
                            <div className="flex gap-2 mt-2">
                                <button
                                    onClick={handleEdit}
                                    className="flex items-center gap-1 px-3 py-1.5 text-xs md:text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition-colors"
                                    disabled={editMutation.isPending || !editContent.trim()}
                                >
                                    <Check size={14} />
                                    {editMutation.isPending ? "Saving..." : "Save"}
                                </button>
                                <button
                                    onClick={handleCancelEdit}
                                    className="flex items-center gap-1 px-3 py-1.5 text-xs md:text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                                    disabled={editMutation.isPending}
                                >
                                    <X size={14} />
                                    Cancel
                                </button>
                            </div>
                        </div>
                    ) : (
                        <p className="text-sm md:text-base text-gray-800 whitespace-pre-wrap break-words mb-2">
                            {comment.content}
                        </p>
                    )}

                    {/* Action Buttons */}
                    {!isEditing && (
                        <div className="flex items-center gap-4 mt-2">
                            {currentUserId && !isMaxDepth && (
                                <button
                                    onClick={() => setShowReplyForm(!showReplyForm)}
                                    className="flex items-center gap-1 text-xs md:text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors"
                                >
                                    <MessageCircle size={14} />
                                    Reply
                                </button>
                            )}

                            {canEdit && (
                                <button
                                    onClick={() => setIsEditing(true)}
                                    className="flex items-center gap-1 text-xs md:text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors"
                                >
                                    <Edit2 size={14} />
                                    Edit
                                </button>
                            )}

                            {canDelete && (
                                <button
                                    onClick={() => setShowDeleteConfirm(true)}
                                    className="flex items-center gap-1 text-xs md:text-sm font-medium text-gray-600 hover:text-red-600 transition-colors"
                                    disabled={deleteMutation.isPending}
                                >
                                    <Trash2 size={14} />
                                    Delete
                                </button>
                            )}
                        </div>
                    )}

                    {/* Delete Confirmation */}
                    {showDeleteConfirm && (
                        <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg">
                            <p className="text-sm text-red-800 mb-3">
                                Are you sure you want to delete this comment?
                                {comment.replies && comment.replies.length > 0 && (
                                    <span className="block mt-1 text-xs">
                                        This will also delete {comment.replies.length} {comment.replies.length === 1 ? 'reply' : 'replies'}.
                                    </span>
                                )}
                            </p>
                            <div className="flex gap-2">
                                <button
                                    onClick={handleDelete}
                                    className="px-3 py-1 text-sm font-medium text-white bg-red-600 rounded hover:bg-red-700 disabled:bg-gray-400 transition-colors"
                                    disabled={deleteMutation.isPending}
                                >
                                    {deleteMutation.isPending ? "Deleting..." : "Delete"}
                                </button>
                                <button
                                    onClick={() => setShowDeleteConfirm(false)}
                                    className="px-3 py-1 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded hover:bg-gray-50 transition-colors"
                                    disabled={deleteMutation.isPending}
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Reply Form */}
                    {showReplyForm && (
                        <div className="mt-3">
                            <CommentForm
                                postId={postId}
                                parentCommentId={comment.id}
                                onSuccess={() => setShowReplyForm(false)}
                                placeholder={`Reply to ${comment.users?.username || 'user'}...`}
                                buttonText="Post Reply"
                            />
                        </div>
                    )}
                </div>
            </div>

            {/* Nested Replies */}
            {comment.replies && comment.replies.length > 0 && (
                <div className="border-l-2 border-gray-200">
                    {comment.replies.map((reply) => (
                        <CommentItem
                            key={reply.id}
                            comment={reply}
                            postId={postId}
                            currentUserId={currentUserId}
                            postAuthorId={postAuthorId}
                            depth={depth + 1}
                        />
                    ))}
                </div>
            )}
        </div>
    )
}

export default CommentItem
