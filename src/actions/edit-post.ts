'use server'
import z from "zod";
import { postSchema } from "./schemas";
import { createClient } from "@/utils/supabase/server-client";
import { slugify } from "@/utils/slugify";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { uploadImage } from "@/utils/supabase/upload-image";


export const EditPost = async ({postId, userdata}: {postId: number, userdata: z.infer<typeof postSchema>}) => {
    const parsedData = postSchema.parse(userdata)

      const imageFile =  userdata.image?.get("image")
    
        if(!(imageFile instanceof File) && imageFile !== null) {
            throw new Error("Malformed Image file")
        }
    
        const publicImageUrl = imageFile ?  await uploadImage(imageFile) : null

    const supabase = await createClient()
    const {data: {user}} = await supabase.auth.getUser()



    const {data: post, error} = await supabase.from("posts") 
                                              .select("*")
                                              .eq("id", postId)
                                              .single()

        if (!post) throw new Error("Post not found");
        if( user?.id !== post?.user_id) throw new Error ("not authorized");

        //update post
        const {data: updatePost} =
         await supabase.from('posts')
                       .update({...parsedData, image: publicImageUrl, slug: slugify(parsedData.title)})
                       .eq('id', postId)
                       .select("slug") // selecting the slug which returns it
                       .single()
                       .throwOnError()

        if(error) throw error
        
        revalidatePath('/')
        redirect(`/${updatePost.slug}`)
                             
}
