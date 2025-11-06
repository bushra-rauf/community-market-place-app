import HomePosts from "@/components/Home/HomePosts";
import { getHomePosts } from "@/utils/supabase/quries";
import { createClient } from "@/utils/supabase/server-client";

  export const revalidate = 600;

export default async function Home() {
  const supabase = await createClient()
    const {data, error} = await getHomePosts(supabase);

  
                                              
  // console.log('data:'  + data, 'error' + error?.message) 
    return (
    <div className="w-[80%] mx-auto">
      {/* {data && data.map(({id, title, slug, users}) => <div key= {id}>{title}{users.username})} */}
        <HomePosts posts={data!}/>
    </div>
  )
}

