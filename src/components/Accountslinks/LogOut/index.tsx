'use client'

import { LogOut } from "@/actions/log-out"

const LogOutButton = () => {
    const handleClick = () => {
        LogOut()
    }

    return(
        <button
            onClick={handleClick}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-2 py-1.5 sm:px-3 sm:py-2 md:px-2 font-semibold rounded-lg transition-colors duration-200 text-xs sm:text-sm md:text-base whitespace-nowrap"
        >
            Log Out
        </button>
    )
}

export default LogOutButton