export enum HttpStatusCode {
    OK = 200,
    BAD_REQUEST = 400,
    NOT_FOUND = 404,
    INTERNAL_SERVER = 500,
    UNAUTHENTICATED = 401
}


class BaseError extends Error {
    public readonly name!: string;
    public readonly httpCode!: HttpStatusCode;
    public readonly isOperational!: boolean;

    constructor (name: string, httpCode: HttpStatusCode, description:string, isOperational: boolean) {
        super(description);
        Object.setPrototypeOf(this, new.target.prototype);

        this.name = name;
        this.httpCode = httpCode;
        this.isOperational = isOperational;

        Error.captureStackTrace(this)
    }
}

export class APIError extends BaseError {
    constructor(name:string, httpCode = HttpStatusCode.INTERNAL_SERVER, isOperational = true, description = 'internal server error') {
        super(name, httpCode,description, isOperational);
    }
}

export class BadRequestError extends BaseError {
    constructor (description: string) {
        super('BAD_REQUEST', HttpStatusCode.BAD_REQUEST, description, true)
    }
}

export class NotFoundError extends BaseError {
    constructor (description: string) {
        super('NOT_FOUND', HttpStatusCode.NOT_FOUND, description, true)
    }
}

export class InternalServerError extends BaseError {
    constructor (description: string) {
        super('INTERNAL_SERVER_ERROR', HttpStatusCode.INTERNAL_SERVER, description, true)
    }
}

class ErrorHandler {
    public handleError (err: Error): void {
        console.log(`Error message from the centralized error-handling component ::\n ${err}`)
    }

    public isTrustedError (err: Error) {
        if (err instanceof BaseError) {
            return err.isOperational;
        }
        return false;
    }

    public getError (err: Error){
        if (err instanceof BaseError) {
            return {
                statusCode: err.httpCode,
                message: err.message,
                name: err.name,
                stack: err.stack
            }
        }
        
    }
}

export const errorHandler = new ErrorHandler()