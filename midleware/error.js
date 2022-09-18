const checkError = (app) =>{
    app.use((req,res,next)=>{
        let error = new Error('page not found')
        error.status = 404;
        next(error);
    })
};

const printError =(app)=>{
    app.use((error,req,res,next)=>{
        if(error.status === 404) {
            res.json({
                status: error.status,
                message: error.message,
            })
        }
    })
}

const ErrorHandler = (app) => {
    checkError(app)
    printError(app)
}

module.exports = ErrorHandler