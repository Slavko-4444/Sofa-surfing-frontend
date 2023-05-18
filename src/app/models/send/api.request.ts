export class APIData {
    path!: string;
    method!: 'get' | 'post' | 'patch' | 'delete';
    body: any | undefined;
    role: 'user' | 'administrator' = 'user';
}