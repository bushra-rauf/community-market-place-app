import { createClient } from "@/utils/supabase/server-client"
import { getSinglePosts } from "@/utils/supabase/quries"
import DeleteButton from "./DeleteButton"
import EditButton from "./EditButton"
import CommentsSection from "@/components/CommentsSection"

const SinglePost = async({params}: {params:{slug: string}}) => {
    const {slug} = await params
       
    const {data, error} = await getSinglePosts(slug)

     const supabase = await createClient()
     const {data: {user}} = await supabase.auth.getUser()
     const isAuthor = user?.id ===data?.user_id ? true : false

    if(!data){
        return error ?(
            <p className="text-red-400">Error: {error.message}</p>)
            : <p>No post found</p>
        }
        console.log(data)

    return(
    <div className="px-4 py-6 sm:px-6 lg:px-8">
        {data &&
          <>
            <div className='flex flex-col border p-4 sm:p-6 rounded-lg shadow-sm max-w-2xl mx-auto mt-4 sm:mt-6 lg:mt-8'>
                <h3 className="text left">{data.id}</h3>
                <h2 className="text-center font-extrabold text-2xl lg:text-3xl">{data.title}</h2>
                <p className="text-lg lg:text-xl mt-4">{data.content}</p>
                <div className="text-right mt-4 text-gray-600">by {data.users.username}</div>
                 {data.image && <div className="border mt-5 p-4 rounded"><img src={data.image} alt={data.title} className="w-full h-auto"/></div> }
            </div>
            { isAuthor &&
            <div className="flex justify-between max-w-2xl mx-auto p-4 sm:p-6 border border-gray-300 rounded-lg shadow-sm mt-6 lg:mt-12">
                <DeleteButton postId={data.id}/>
                <EditButton slug={slug}/>

            </div>
            }

            {/* Comments Section */}
            <div className="max-w-2xl mx-auto mt-8">
                <CommentsSection
                    postId={data.id}
                    postAuthorId={data.user_id}
                    currentUserId={user?.id}
                />
            </div>
          </>
        }
    </div>
    )
}

export default SinglePost