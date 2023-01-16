import { createClient } from "@supabase/supabase-js";

const PROJECT_URL = 'https://krrpdvgrratyfvzvaycf.supabase.co';
const PUBLIC_KEY = "XluzdBorttQykKSTlvB76K/b0gUCLqI3eDfKVxSj4Dq6qzK8uVxhTJz6dGH62MpDvfdmbGd2afKSwtfm5Y9S/A==";
const supabase = createClient(PROJECT_URL, PUBLIC_KEY);

export function videoService() {
    return {
        getAllVideos() {
            return supabase.from("video")
                    .select("*");
        }
    }
}