import HomePosts from "@/components/Home/HomePosts";
import { getHomePosts } from "@/utils/supabase/quries";

export default async function Home() {
    const {data, error} = await getHomePosts();
                                              
  // console.log('data:'  + data, 'error' + error?.message) 
    return (
    <div className="w-[80%] mx-auto">
      {/* {data && data.map(({id, title, slug, users}) => <div key= {id}>{title}{users.username})} */}
        <HomePosts posts={data!}/>
    </div>
  )
}

