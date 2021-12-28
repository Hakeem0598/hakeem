class AppError {
    status: string;

    constructor(public message: string, public statusCode: number) {
        this.statusCode = statusCode || 500;
        this.status = statusCode.toString().startsWith('5') ? 'error' : 'fail';
    }
}

export default AppError;