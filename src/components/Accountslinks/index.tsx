import { createClient } from "@/utils/supabase/server-client"
import Link from "next/link"
import LogOutButton from "./LogOut"

const AccountLinks = async () => {
    const supabase = await createClient()
    const {data: {user}} = await supabase.auth.getUser()

    return (
       <div className="flex items-center gap-1.5 sm:gap-2 md:gap-3">
        {user ?
        <>
            <Link href='/create' className='bg-blue-600 hover:bg-blue-700 px-2 py-1.5 sm:px-3 sm:py-2 md:px-4 rounded-lg font-semibold text-white transition-colors duration-200 text-xs sm:text-sm md:text-base whitespace-nowrap'>
                <span className="hidden xs:inline">Create Post</span>
                <span className="xs:hidden">Create</span>
            </Link>
            <LogOutButton/>
        </>
        :
        <div className="flex items-center gap-1.5 sm:gap-2">
            <Link href='/auth/signup'
                className='text-gray-700 hover:text-gray-900 px-2 py-1.5 sm:px-3 sm:py-2 rounded-lg font-medium transition-colors duration-200 text-xs sm:text-sm md:text-base whitespace-nowrap'>
                Sign Up
            </Link>
            <Link href='/auth/login' className='bg-blue-600 hover:bg-blue-700 px-2 py-1.5 sm:px-3 sm:py-2 md:px-4 rounded-lg font-semibold text-white transition-colors duration-200 text-xs sm:text-sm md:text-base whitespace-nowrap'>
                Sign In
            </Link>
        </div>
        }
       </div>

    )
}

export default AccountLinks