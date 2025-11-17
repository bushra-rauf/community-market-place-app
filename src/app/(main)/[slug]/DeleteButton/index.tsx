'use client'
import { DeletePost } from "@/actions/delete"
import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"

const DeteleButton = ({postId}: {postId: number}) => {
    const {mutate, error} =  useMutation({
        mutationFn: DeletePost,
        onMutate: () => toast("Deleting your post"),
        onSettled: () => toast.success ("Post deleted")  
    })
    
    return(
            <button onClick={()=> mutate(postId)} className="bg-black w-25 text-center border p-2 text-white font-bold rounded-2xl">Delete</button>
    )
}

export default DeteleButton