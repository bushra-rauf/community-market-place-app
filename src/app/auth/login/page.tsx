import Link from "next/link"
import LogInForm from "./LogInform"

const LogIn = () => {
    return (
      <>
        <div className="mt-20 border-1 rounded-2xl w-140 h-75 mx-auto p-4">
             <LogInForm/>
            Dont have an account ? sign up <Link className='text-red-500' href='/auth/signup'>here!</Link>
        </div>
      </>
    )
} 

export default LogIn