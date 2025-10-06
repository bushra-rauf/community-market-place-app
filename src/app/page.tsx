

import { createClient } from "../utils/supabase/browser-client";

export default async function Home() {
  const supabase = createClient();
  const {data, error} = await supabase.from('posts').select('id, title, users("username")')
                                                    .order("created_at", {ascending: false}) 
                                                    
  console.log('data:'  + data, 'error' + error?.message) 
    return (
    <div className="w-[80%] mx-auto">
      Hi World!
      {data && data.map(item => (<div key={item.id}>{item.id}  {item.title}  {item.users.username}</div>))}
    </div>
  )
}

