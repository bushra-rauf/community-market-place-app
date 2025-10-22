'use server'

import { createClient } from "@/utils/supabase/server-client"
import { redirect } from "next/navigation"

export const LogIn = async(formdata: FormData) => {
    const userdata = {
        email: formdata.get("email") as string,
        password: formdata.get("password") as string
    }
    const supabase = await createClient()

    const {data: {user}, error} = await supabase.auth.signInWithPassword(userdata)
    //   if (user && user.email) {
    //         const {data, error} = await supabase.from ("users").insert([{id:user.id, email: user.email, username: userdata.username}])
    //     }
      if(error) throw error
    
    redirect("/")
}