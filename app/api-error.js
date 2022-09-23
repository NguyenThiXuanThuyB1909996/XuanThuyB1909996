class ApiError extends Error{
    constructor (statusCode, mesage){
        super();
        this.statusCode = statusCode;
        this.message= message;
    }
}
module.exports = ApiError;