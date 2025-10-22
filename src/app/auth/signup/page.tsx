import Link from "next/link"
import SignUpForm from "./SignUpForm"

const SignUp = () => {
    return(
        <div className="mt-20 border-1 rounded-2xl w-140 h-85 mx-auto p-4">
            <SignUpForm/>
            <p className="pl-2">
               Already have an account ? log in  <Link className='text-red-500' href='/auth/login'>here!</Link>
            </p>
        </div>
    )
}
export default SignUp