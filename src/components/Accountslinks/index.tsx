import { createClient } from "@/utils/supabase/server-client"
import Link from "next/link"
import LogOutButton from "./LogOut"
const AccountLinks = async () => {
    const supabase = await createClient() 
    const {data: {user}, error} = await supabase.auth.getUser()
    return (
       <div> 
        {user ? <LogOutButton/>
            :  <Link href= '/auth/login' className='bg-rose-400 p-2 rounded-xl font-bold text-white'>LogIn</Link>
        }
       </div>
        
    )
}

export default AccountLinks