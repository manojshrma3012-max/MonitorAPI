class ResponseFormatter {
    static success(data=null,message = 'Success',statusCode = 200) {
        return {
            status: true,
            message: message,
            data: data,
            statusCode: statusCode,
            timestamp: new Date().toISOString(),
        };
    }
    static error(message = 'Error',statusCode = 500,error = null) {
        return {
            status: false,
            message: message,
            error: error,
            statusCode: statusCode,
            timestamp: new Date().toISOString(),
        };
    }
    static ValidationError(error = null) {
        return {
            status: false,
            message: "validation failed",
            error: error,
            statusCode: 400,
            timestamp: new Date().toISOString(),
        };
    }
    static paginated(data=null,page,limit,total) {
        return {
            status: true,
            data: data,
            page: page,
            limit: limit,
            total: total,
            totalPages: Math.ceil(total / limit),
            timestamp: new Date().toISOString(),
        };
    }
}   


export default ResponseFormatter;
       
  