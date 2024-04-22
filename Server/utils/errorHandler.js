class createError extends Error{
    constructor(message,statusCode){
        super(message); //calling the constructor of parent class "Error"
        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith('4')? 'fail':'success';

        // Error.captureStackTrace(this,this.constructor);
    }
}

module.exports = createError;