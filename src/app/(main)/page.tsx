import HomePosts from "@/components/Home/HomePosts";
import { getHomePosts } from "@/utils/supabase/quries";
import { createClient } from "@/utils/supabase/server-client";
import cache from "next/cache"
import Link from "next/link";
  export const revalidate = 600;

export default async function Home() {
  const supabase = await createClient()
    const {data, error} = await getHomePosts(supabase);

  
                                              
  // console.log('data:'  + data, 'error' + error?.message) 
    return (
    <div className="w-[80%] mx-auto">
      {/* {data && data.map(({id, title, slug, users}) => <div key= {id}>{title}{users.username})} */}
        {/* <HomePosts posts={data!}/> */}
            {data && data.map(({id, title, slug, users}) => 
                <Link href={`/${slug}`}className='block border-1 p-4 rounded mt-4 max-w-2xl m-auto'key={id}>
                   <h2 className="font-bold text-xl">{title}</h2> 
                   <div className="text-right">by {users.username}</div>
                </Link>
            )}

    </div>
  )
}

