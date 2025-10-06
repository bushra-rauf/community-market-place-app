import { createClient } from "@/utils/supabase/browser-client"
import { getSinglePosts } from "@/utils/supabase/quries"


const SinglePost = async({params}: {params:{slug: string}}) => {
    const {slug} = await params
        // const supabase = await createClient()
    const {data, error} = await getSinglePosts(slug)

    if(!data){
        return error ?(
            <p className="text-red-400">Error: {error.message}</p>)
            : <p>No post found</p>
        }
        console.log(data)

    return(
    <div>        
        {data &&  
           
            <div className='flex flex-col border-1 p-4 rounded mt-8 max-w-2xl m-auto'>
                <h3 className="text left">{data.id}</h3>
                <h2 className="text-center font-extrabold text-2xl">{data.title}</h2>
                <p className="text-xl">{data.content}</p>
                <div className="text-right">by {data.users.username}</div>
            </div>
        }
    </div>
    )
}

export default SinglePost