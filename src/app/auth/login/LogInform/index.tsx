'use client'
import { LogIn } from "@/actions/log-in"
import { logInSchema } from "@/actions/schemas"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"


const LogInForm = () => {
   
    const {register, handleSubmit, formState:{errors}} = useForm({
        resolver: zodResolver(logInSchema)
    })
    return (
        <>
        <form onSubmit={handleSubmit(values => LogIn(values))}className="flex flex-col mb-4">
           <h2 className="mb-6">Log in!</h2>
           <fieldset>
               <label className="font-bold text-2xl p-2" htmlFor="email">Enter your email</label>
               <input className="ml-2 mb-6 px-2"{...register('email')} id="email" placeholder="Enter your email"/>
               {errors.email && <p>{errors.email.message}</p>}
           </fieldset>
            <fieldset>
               <label className="font-bold text-2xl p-2" htmlFor="password">Enter your password</label>
               <input className='ml-6 mb-5 px-2'{...register('password')}id="password" placeholder="Enter your password"/>
           </fieldset>
           <button className=" bg-blue-400 hover:bg-blue-500 text-white p-2 font-bold text-2xl rounded-xl">Log in</button>
        </form>
        </>
    )
}

export default LogInForm