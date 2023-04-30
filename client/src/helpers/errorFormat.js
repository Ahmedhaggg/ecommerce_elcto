export const errorFormat = (error) => {
    let message = null;
    let validationErrors = {};
    // if (error.error === "BAD_REQUEST")
    //     message = error.description || "internal server error"
    if (error.error === "VALIDATION_ERROR")
        error.description.forEach(errorField => {
            validationErrors[errorField.param] = errorField.msg;
        });
    else 
        message = error.description || "internal server error"
    
    return { message, validationErrors }
} 