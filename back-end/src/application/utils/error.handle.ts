interface Cause {
  message: string;
  field: string;
}

class ErrorHandler {
  message: string;
  code: number;
  causes?: Cause[];

  constructor(message: string, code = 400, causes?: Cause[]) {
    this.message = message;
    this.code = code;
    this.causes = causes;
  }
}

export { ErrorHandler };
