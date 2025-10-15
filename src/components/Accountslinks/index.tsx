import Link from "next/link"
const AccountLinks = () => {
    return (
       <div> 
        <Link href= '/auth/login' className='bg-rose-400 p-2 rounded-xl font-bold text-white'>LogIn</Link>
       </div>
    )
}

export default AccountLinks