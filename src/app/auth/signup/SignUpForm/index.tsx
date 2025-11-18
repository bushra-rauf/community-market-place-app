"use client"
import { signUpSchema } from "@/actions/schemas"
import { SignUp } from "@/actions/sign-up"
import ErrorMessage from "@/components/ErrorMessage"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"


const SignUpForm = () => {
    const {register, handleSubmit, formState:{errors}} = useForm({
        resolver: zodResolver(signUpSchema)
    })
    return (
        <>
        <form onSubmit={handleSubmit(values => SignUp(values))} className="flex flex-col mb-4">
           <h2 className="mb-6 text-xl sm:text-2xl font-semibold text-gray-800">Create your account!</h2>
           <fieldset>
               <label className="font-bold text-2xl p-2" htmlFor="email">Enter your email</label>
               <input className="ml-2 mb-6 px-2" {...register("email")} id="email" placeholder="Enter your email"/>
               {errors.email && <ErrorMessage message={errors.email.message!}/>}
           </fieldset>
           <fieldset>
               <label className="font-bold text-2xl p-2" htmlFor="Username">Enter your name</label>
               <input className='ml-6 mb-5 px-2'{...register("username")}id="username" placeholder="what is your name..."/>
               {errors.username && <ErrorMessage message={errors.username.message!}/>}
           </fieldset>
            <fieldset>
               <label className="font-bold text-2xl p-2" htmlFor="password">Enter your password</label>
               <input className='ml-6 mb-5 px-2'{...register("password")}id="password" placeholder="Enter your password"/>
               {errors.password && <ErrorMessage message={errors.password.message!}/>}
           </fieldset>
           <button className=" bg-blue-400 hover:bg-blue-500 text-white p-2 font-bold text-2xl rounded-xl">Sign Up</button>
        </form>
        </>
    )
}

export default SignUpForm