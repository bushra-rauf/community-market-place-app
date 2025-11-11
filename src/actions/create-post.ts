'use server'

import z from "zod"
import { postSchema } from "./schemas"
import { createClient } from "@/utils/supabase/server-client"
import { slugify } from "@/utils/slugify"
import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"
import { uploadImage } from "@/utils/supabase/upload-image"

export const CreatePost = async (userdata: z.infer<typeof postSchema>) =>{
    const parasedData = postSchema.parse(userdata)
    const supabase = await createClient()
    const {data: {user}} = await supabase.auth.getUser();

    if (!user) throw new Error("not authorized")

    const slug = slugify(parasedData.title)
    const userid = user.id;
    
    const imageFile =  userdata.image?.get("image")

    if(!(imageFile instanceof File) && imageFile !== null) {
        throw new Error("Malformed Image file")
    }

    const publicImageUrl = imageFile ?  await uploadImage(imageFile) : null

    const {error} = await supabase.from ('posts')
                                  .insert([{user_id: userid, slug, ...parasedData, image: publicImageUrl}])
                                  .throwOnError()

    revalidatePath('/')
    redirect(`/${slug}`)

}