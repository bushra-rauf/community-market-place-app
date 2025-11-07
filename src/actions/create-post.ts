'use server'

import z from "zod"
import { postSchema } from "./schemas"
import { createClient } from "@/utils/supabase/server-client"
import { slugify } from "@/utils/slugify"
import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"

export const CreatePost = async(userdata: z.infer<typeof postSchema>) =>{
    const parasedData = postSchema.parse(userdata)
    const supabase = await createClient()
    const {data: {user}} = await supabase.auth.getUser();

    if (!user) throw new Error("not authorized")

    const slug = slugify(parasedData.title)
    const userid = user.id;

    const {error} = await supabase.from ('posts')
                                  .insert([{user_id: userid, slug, ...parasedData}])
                                  .throwOnError()

    revalidatePath('/')
    redirect(`/${slug}`)

}