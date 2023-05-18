export interface ApiResponse {
    status: 'ok' | 'login Error' | 'service Error';
    data: any;
}