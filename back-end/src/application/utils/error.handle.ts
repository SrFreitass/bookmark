class ErrorHandler {
    message: string;
    code: number
    causes?: Cause[];

    constructor(message: string, code: number = 400, causes?: Cause[]) {
        this.message = message;
        this.code = code;
        this.causes = causes;
    }
}

interface Cause {
    message: string;
    field: string;
}

export { ErrorHandler };

