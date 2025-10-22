'use client'

import { LogOut } from "@/actions/log-out"

const LogOutButton = () => {
    const handleClick = () =>{
        LogOut()
    }

    return(
        <button onClick={handleClick} className="bg-blue-400 hover:bg-blue-500 text-white p-2 font-bold text-xl rounded-xl">LogOut</button>
    )
}
export default LogOutButton