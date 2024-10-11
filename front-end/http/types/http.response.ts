interface HTTPResponse<T> {
    success: boolean;
    message: string;
    statusCode: number;
    data: T;
}

export type { HTTPResponse };