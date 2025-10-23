import { SignUp } from "@/actions/sign-up"


const SignUpForm = () => {
    return (
        <>
        <form action={SignUp} className="flex flex-col mb-4">
           <h2 className="mb-6">Sign Up!</h2>
           <fieldset>
               <label className="font-bold text-2xl p-2" htmlFor="email">Enter your email</label>
               <input className="ml-2 mb-6 px-2" id="email" name="email" placeholder="Enter your email"/>
           </fieldset>
           <fieldset>
               <label className="font-bold text-2xl p-2" htmlFor="Username">Enter your name</label>
               <input className='ml-6 mb-5 px-2'id="username" name="username" placeholder="what is your name..."/>
           </fieldset>
            <fieldset>
               <label className="font-bold text-2xl p-2" htmlFor="password">Enter your password</label>
               <input className='ml-6 mb-5 px-2'id="password" name="password" placeholder="Enter your password"/>
           </fieldset>
           <button className=" bg-blue-400 hover:bg-blue-500 text-white p-2 font-bold text-2xl rounded-xl">Sign Up</button>
        </form>
        </>
    )
}

export default SignUpForm