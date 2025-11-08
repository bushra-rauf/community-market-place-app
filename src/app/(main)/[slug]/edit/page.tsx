import { getSinglePosts } from "@/utils/supabase/quries"


const EditPage = async ({params} : {params: {slug: string} }) => {
    const {slug} = await params
    const {data, error} = await getSinglePosts(slug)

    return (
      <div>
        { data && 
             <EditForm/>
        }
      </div>
    )
}

export default EditPage