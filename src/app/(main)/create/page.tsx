'use client'
import { CreatePost } from "@/actions/create-post";
import { postSchema } from "@/actions/schemas";
import ErrorMessage from "@/components/ErrorMessage";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import z from "zod";

const CreatePage = () => {

    const schemaWithImage = postSchema.omit({image: true})
    .extend({image: z.unknown().transform(value => {return value as (FileList)}).optional()})
    const {register, handleSubmit, formState: {errors}} = useForm({
         resolver: zodResolver (schemaWithImage)
    })

const {mutate, error} = useMutation({
      mutationFn: CreatePost
})
     
    return(
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
          <div className="w-full max-w-lg bg-white shadow-lg rounded-2xl p-8">
            <h2 className="font-bold text-3xl mb-6 text-center text-gray-800">
               Get something to say?
            </h2>
            <form onSubmit={handleSubmit(values => {
              const imageForm = new FormData();

              if(values.image) imageForm.append('image', values.image[0])

              mutate({title: values.title, content: values.content, image: imageForm })
            } 

            )} className="space-y-6">
            {/* Title */}
            <fieldset>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Post Title</label>
                <input {...register("title")} id="title" type="text" placeholder="What is your post title?" className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 p-3"/>
            </fieldset>
            {/* Content */}
            <fieldset>
                <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1"> Content </label>
                <textarea {...register("content")} id="content" rows={4} placeholder="Write your post here..."className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 p-3"/>
            </fieldset>
             <fieldset>
            <label htmlFor="image">upload an image for your post if you like</label>
            <input type='file'{...register('image')} id='image' name='image'></input>
            {errors.image && <ErrorMessage message={errors.image.message!}></ErrorMessage>}
          </fieldset>
            {/* Button */}
            <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg shadow-md transition duration-200"> Create Post </button>
            </form>
      </div>
    </div>
  );
};
  

export default CreatePage