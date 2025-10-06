import { createClient } from "./browser-client";
import {type  QueryData } from "@supabase/supabase-js";

export const getHomePosts = async () => {
    const supabase = createClient();
      return  await supabase.from('posts').select('id, title, slug, users("username")')
                                          .order("created_at", {ascending: false}) 
}
export const getSinglePosts = async (slug: string) => {
    const supabase = createClient();
      return await supabase.from('posts')
                           .select('id, title, slug, content, created_at, users(username)')
                           .eq('slug', slug)
                           .single()
}
export type HomePostType = QueryData<ReturnType<typeof getHomePosts>>