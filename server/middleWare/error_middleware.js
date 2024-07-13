const errorMiddleware = (err, req, res, next) => {
    const status = err.status || 500; // Use || instead of | for logical OR
    const message = err.message || "Backend error"; // Use || instead of | for logical OR
    const extraDetails = err.extraDetails || "Error from backend"; // Use || instead of | for logical OR
    return res.status(status).json({ message, extraDetails });
};

module.exports = errorMiddleware;
