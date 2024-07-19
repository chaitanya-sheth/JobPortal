const errorMiddleware = (err, req, res, next) => {
    console.log(err, "--> error");

    const defaultErrors = {
        status: 500,
        message: err || "Something went wrong"
    };

    res.status(defaultErrors.status).json({ message: defaultErrors.message });
};

export default errorMiddleware;
