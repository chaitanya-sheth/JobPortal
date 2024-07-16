const errorMiddleware = (err, req, res, next) => {
    console.log(err, "--> error");

    const defaultErrors = {
        status: 500,
        message: err.message || "Something went wrong"
    };

    if (err.name === "ValidationError") {
        defaultErrors.status = 400;
        defaultErrors.message = Object.values(err.errors).map((item) => item.message).join(",");
    }

    res.status(defaultErrors.status).json({ message: defaultErrors.message });
};

export default errorMiddleware;
