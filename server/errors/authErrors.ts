/**
 * Error handling for authentication logic.
 */

export const handleAuthErrors = (err: any) => {
    let errors = {username: "", email: "", password: ""};

    if(err.message === "Incorrect username"){
        errors.username = "That username is not registered";
    }

    if(err.message === "Incorrect password"){
        errors.password = "That password is incorrect";
    }

    // duplicate  error code (MongoDB won't let you enter a custom error message for duplicate keys)
    if(err.code === 11000) {
        errors.username = "That username is already registered";
        return errors;
    }

    // validation errors

    if (err.message.includes('user validation failed')) {
        // @ts-ignore
        Object.values(err.errors).forEach( ({properties}) => {
            // @ts-ignore
            errors[properties.path] = properties.message;
        })

    }
    return errors;
}

