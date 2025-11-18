'use client'

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { commentSchema } from "@/actions/schemas"
import { createComment } from "@/actions/create-comment"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { useState } from "react"
import z from "zod"

interface CommentFormProps {
    postId: number
    parentCommentId?: string
    onSuccess?: () => void
    placeholder?: string
    buttonText?: string
}

type CommentFormData = z.infer<typeof commentSchema>

const CommentForm = ({
    postId,
    parentCommentId,
    onSuccess,
    placeholder = "Write a comment...",
    buttonText = "Post Comment"
}: CommentFormProps) => {
    const queryClient = useQueryClient()
    const [isFocused, setIsFocused] = useState(false)

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset
    } = useForm<CommentFormData>({
        resolver: zodResolver(commentSchema),
        defaultValues: {
            postId,
            parentCommentId,
            content: ""
        }
    })

    const mutation = useMutation({
        mutationFn: createComment,
        onSuccess: () => {
            // Invalidate comments query to refetch
            queryClient.invalidateQueries({ queryKey: ['comments', postId] })
            queryClient.invalidateQueries({ queryKey: ['comment-count', postId] })

            toast.success(parentCommentId ? "Reply posted successfully!" : "Comment posted successfully!")
            reset()
            setIsFocused(false)
            onSuccess?.()
        },
        onError: (error: Error) => {
            toast.error(error.message || "Failed to post comment")
        }
    })

    const onSubmit = (data: CommentFormData) => {
        mutation.mutate(data)
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
            <div>
                <textarea
                    {...register("content")}
                    placeholder={placeholder}
                    onFocus={() => setIsFocused(true)}
                    className={`w-full px-4 py-3 border rounded-lg resize-none transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        errors.content ? 'border-red-500' : 'border-gray-300'
                    } ${isFocused ? 'min-h-24' : 'min-h-12'}`}
                    rows={isFocused ? 4 : 1}
                    disabled={isSubmitting || mutation.isPending}
                />
                {errors.content && (
                    <p className="text-red-500 text-sm mt-1">{errors.content.message}</p>
                )}
            </div>

            {isFocused && (
                <div className="flex justify-end gap-2">
                    <button
                        type="button"
                        onClick={() => {
                            reset()
                            setIsFocused(false)
                        }}
                        className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
                        disabled={isSubmitting || mutation.isPending}
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="px-6 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                        disabled={isSubmitting || mutation.isPending}
                    >
                        {mutation.isPending ? "Posting..." : buttonText}
                    </button>
                </div>
            )}
        </form>
    )
}

export default CommentForm
