
export interface AddArticle {
    title:string;
    excerpt:string;
    description: string;
    status: "visible" | "hidden";
    user_id: string;
    userEmail: string;
}