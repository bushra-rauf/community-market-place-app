import { createServerClient } from "@supabase/ssr"
import { NextRequest,NextResponse } from "next/server"

export const middleware = async (request: NextRequest) => {
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

const {data: {user}} = await supabase.auth.getUser()

const protectedRoutes = [
    // /^\/$/,  // protect homepage
    /^\/create$/,
    /^\/[^\/]+\/edit$/ // protect from non logged in user.
]

// const publicRoutes = [
//     /^\/auth\/login$/,
//     /^\/auth\/signup$/
// ]

// Allow access to public routes
// if (publicRoutes.some(route => route.test(request.nextUrl.pathname))) {
//     return supabaseResponse
// }

// Redirect to login if user is not authenticated and trying to access protected routes
if (!user && protectedRoutes.some(route => route.test(request.nextUrl.pathname))) {
    const newUrl = request.nextUrl.clone()
    newUrl.pathname = "/auth/login"
    return NextResponse.redirect(newUrl)
}

// return supabaseResponse
}