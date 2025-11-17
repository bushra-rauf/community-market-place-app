'use client'
import { LogIn } from "@/actions/log-in"
import { logInSchema } from "@/actions/schemas"
import ErrorMessage from "@/components/ErrorMessage"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { useForm } from "react-hook-form"


const LogInForm = () => {
   
    const {register, handleSubmit, formState:{errors}} = useForm({
        resolver: zodResolver(logInSchema)
    })

    const {mutate,error,isPending} = useMutation({
         mutationFn: LogIn,
    })

    return (

        <>
      

        <form onSubmit={handleSubmit(values => mutate(values))}className="flex flex-col mb-4">
           <h2 className="mb-6 text-xl sm:text-2xl font-semibold text-gray-800">Log in to your account</h2>
           <fieldset>
               <label className="font-bold text-2xl p-2" htmlFor="email">Enter your email</label>
               <input className="ml-2 mb-6 px-2"{...register('email')} id="email" placeholder="Enter your email"/>
               {errors.email && <ErrorMessage message= {errors.email.message!}/>}
           </fieldset>
            <fieldset>
               <label className="font-bold text-2xl p-2" htmlFor="password">Enter your password</label>
               <input className='ml-6 mb-5 px-2'{...register('password')}id="password" placeholder="Enter your password"/>
               {errors.password && <ErrorMessage message= {errors.password.message!}/>}
            </fieldset><button className=" bg-blue-400 hover:bg-blue-500 text-white p-2 font-bold text-2xl rounded-xl">{isPending? "logging you in" : "Log in"}</button>
        </form>
        {errors && <ErrorMessage message={error?.message!}/>}
        </>
    )
}

export default LogInForm