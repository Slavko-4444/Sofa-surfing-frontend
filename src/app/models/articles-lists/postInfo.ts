export interface PostInfo {
    _id: string;
    title: string;
    excerpt: string;
    description: string;
    image_path: string[];
    status: "hidden"|"visible";
    created_at: string;
    user_id: string;
}