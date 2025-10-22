import { createServerClient } from "@supabase/ssr"
import { NextResponse } from "next/server"

export const middleware = async (request: NextResponse) => {
    let supabaseResponse = NextResponse.next({request})

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPEBASE_URL!,
        process.env.NEXT_PUBLIC_SUPEBASE_PUBLISHABLE_KEY!,
        {
            cookies:{
                getAll() {
                    return request.cookies.getAll()
                },
                setAll(cookiesToSet){
                    cookiesToSet.forEach(({name, value}) => request.cookies.set(name, value))
                    cookiesToSet.forEach(({name, value, options}) => supabaseResponse.cookies.set(name, value,options))
                }
            }
        }
)

const {data: {user}, error} = await supabase.auth.getUser()
console.log("hello from middleware")
console.log('user', user)
    
}