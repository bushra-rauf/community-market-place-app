import { HomePostType } from "@/utils/supabase/quries"
import Link from "next/link"

const HomePosts = ({posts}: {posts:HomePostType}) => {
    return(
        <div >
            {posts && posts.map(({id, title, slug, users}) => 
                <Link href={`/${slug}`}className='block border-1 p-4 rounded mt-4'key={id}>
                   <h2 className="Font-bold text-xl">{title}</h2> 
                   <div className="text-right">by {users.username}</div>
                </Link>
            )}
        </div>
    )
}

export default HomePosts