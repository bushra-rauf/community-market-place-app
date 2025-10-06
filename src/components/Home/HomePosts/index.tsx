'use client'
import { getHomePosts, HomePostType } from "@/utils/supabase/quries"
import { useQuery } from "@tanstack/react-query"
import Link from "next/link"

const HomePosts = ({posts}: {posts:HomePostType}) => {
    const {data} = useQuery({
        queryKey: ['home-posts'],
        queryFn:  async() => {
            const {data,error} = await getHomePosts()
            if(error) throw error
            return data
         },
         initialData: posts,
         refetchOnMount: false,
         staleTime: 10000 * 10
    })
    return(
        <div >
            {data && data.map(({id, title, slug, users}) => 
                <Link href={`/${slug}`}className='block border-1 p-4 rounded mt-4 max-w-2xl m-auto'key={id}>
                   <h2 className="font-bold text-xl">{title}</h2> 
                   <div className="text-right">by {users.username}</div>
                </Link>
            )}
        </div>
    )
}

export default HomePosts