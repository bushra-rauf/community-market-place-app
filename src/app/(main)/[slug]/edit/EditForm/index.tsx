// 'use client'
// import { EditPost } from "@/actions/edit-post"
// import { postSchema } from "@/actions/schemas"
// import ErrorMessage from "@/components/ErrorMessage"
// import { Tables } from "@/utils/supabase/database.types"
// import { zodResolver } from "@hookform/resolvers/zod"
// import { useMutation } from "@tanstack/react-query"
// import { useForm } from "react-hook-form"
// import z from "zod"

//  const EditForm =  ({postId, defaultValues} : {postId: number, defaultValues: Pick<Tables<'posts'>, 'title' | 'content' | 'image'> }) => {
    
//       const schemaWithImage = postSchema.omit({image: true})
//       .extend({image: z.unknown().transform(value => {return value as (FileList)}).optional()})

//        const {register, handleSubmit} = useForm({
//         resolver: zodResolver(schemaWithImage),
//         defaultValues: {
//             title: defaultValues.title,
//             content: defaultValues.content || undefined,
//             image: defaultValues.image
//         }
//        })

//        const {mutate, error} = useMutation({
//               mutationFn: EditPost
//        })

//         return(
//             <>
//             <form onSubmit={handleSubmit(values => {
//                 //   let imageForm =  undefined;
//                 let imageForm = new FormData()

//                   if (values.image?.length && typeof values.image !== 'string') {
                    
//                     console.log('values image', typeof values.image)
//                    imageForm.append('image', values.image[0])
//             }
//                 mutate({postId, userdata: {title: values.title, content: values.content!, image: imageForm}}) } ) } className='flex flex-col  mb-4'>
        
//               <fieldset>
//                 <label className="font-bold text-2xl p-2 center" htmlFor= 'title'>Post title</label>
//                 <input className=' border-1 rounded-sm center ml-2 mb-6 px-2 max-w-[200px]'{...register('title')} id='title' placeholder="what is your post called..."></input>
//              </fieldset>
//            < fieldset>
//                <label className="font-bold text-2xl p-2 center" htmlFor= 'content'>what you want to talk about?</label>
//                <textarea className=' border-1 rounded-sm center ml-2 mb-6 px-2 max-w-[200px]'{...register('content')} id='content' placeholder="Start talking...."/>
            
//             </fieldset>
//              < fieldset>
//                {defaultValues.image && <img className="'w-3xl" src={defaultValues.image}alt='post image'/>}
//                  <label className="font-bold text-2xl p-2 center" htmlFor= 'image'>Upload a new image for you</label>
//                  <input {...register("image")} id="image"type="file" />
//             </fieldset>
//             <button  className="bg-blue-500 border p-2 text-white font-bold rounded-2xl">Update Post!</button>
            
//              </form>
//                      {error && <ErrorMessage message={error.message}/>} 
//       </>
//     )
// }

// export default EditForm
'use client'
import { EditPost } from "@/actions/edit-post"
import { postSchema } from "@/actions/schemas"
import ErrorMessage from "@/components/ErrorMessage"
import { Tables } from "@/utils/supabase/database.types"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import z from "zod"

const EditForm = ({postId, defaultValues}: {postId: number, defaultValues: Pick<Tables<'posts'>, 'title' | 'content' | 'image'>}) => {
    
  const schemaWithImage = postSchema.omit({image: true})
    .extend({image: z.unknown().transform(value => {return value as (FileList)}).optional()})

  const {register, handleSubmit, formState: {errors}} = useForm({
    resolver: zodResolver(schemaWithImage),
    defaultValues: {
      title: defaultValues.title,
      content: defaultValues.content || undefined,
      image: defaultValues.image
    }
  })

  const {mutate, error} = useMutation({
    mutationFn: EditPost
  })

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-lg bg-white shadow-lg rounded-2xl p-8">
        <h2 className="font-bold text-3xl mb-6 text-center text-gray-800">
          Edit Your Post
        </h2>
        <form onSubmit={handleSubmit(values => {
          let imageForm = new FormData()

          if (values.image?.length && typeof values.image !== 'string') {
            imageForm.append('image', values.image[0])
          }
          mutate({postId, userdata: {title: values.title, content: values.content!, image: imageForm}})
        })} className="space-y-6">
          {/* Title */}
          <fieldset>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Post Title</label>
            <input 
              {...register("title")} 
              id="title" 
              type="text" 
              placeholder="What is your post called?" 
              className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 p-3"
            />
            {errors.title && <ErrorMessage message={errors.title.message!} />}
          </fieldset>

          {/* Content */}
          <fieldset>
            <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">Content</label>
            <textarea 
              {...register("content")} 
              id="content" 
              rows={4} 
              placeholder="Write your post here..."
              className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 p-3"
            />
            {errors.content && <ErrorMessage message={errors.content.message!} />}
          </fieldset>

          {/* Image Upload */}
          <fieldset>
            {defaultValues.image && (
              <div className="mb-4">
                <p className="text-sm font-medium text-gray-700 mb-2">Current Image</p>
                <img className="w-full rounded-lg shadow-sm" src={defaultValues.image} alt="Post image" />
              </div>
            )}
            <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">
              {defaultValues.image ? 'Upload a new image (optional)' : 'Upload an image for your post'}
            </label>
            <input 
              {...register("image")} 
              id="image" 
              type="file" 
              className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
            {errors.image && <ErrorMessage message={errors.image.message!} />}
          </fieldset>

          {/* Submit Button */}
          <button 
            type="submit" 
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg shadow-md transition duration-200"
          >
            Update Post
          </button>

          {/* Error Message */}
          {error && (
            <div className="mt-4">
              <ErrorMessage message={error.message} />
            </div>
          )}
        </form>
      </div>
    </div>
  )
}

export default EditForm