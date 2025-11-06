'use client'
import { DeletePost } from "@/actions/delete"

const DeteleButton = ({postId}: {postId: number}) => {
    return(
            <button onClick={()=> DeletePost(postId)} className="bg-black border p-2 text-white font-bold rounded-2xl">Delete</button>
    )
}

export default DeteleButton