const validate = (registerSchema) => async (req, res, next) => {
    try {
        // Validate the request body using the provided schema
        const parsedBody = await registerSchema.parseAsync(req.body);
        req.body = parsedBody; // Replace the request body with the validated one
        next(); // Move to the next middleware or route handler
    } catch (err) {
        // If validation fails, construct an error object
        const status = 422;
        const message = "Fill the input properly";
        const extraDetails = err.errors[0].message; // Get the validation error message
        const error = {
            status,
            message,
            extraDetails,
        };

        // Log the error for debugging purposes
        console.error(error);

        // Send a response with the error details
        res.status(status).json(error);
    }
};

module.exports = validate;
