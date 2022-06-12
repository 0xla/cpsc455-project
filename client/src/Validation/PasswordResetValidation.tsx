import * as yup from "yup";

export const validationSchema = yup.object({
    password: yup
        .string()
        .required('Please enter your password')
        .matches(
            /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
            "Must contain eight characters, one uppercase, one lowercase, one number and one special character"
        ),
    confirmPassword: yup.string().oneOf([(yup.ref('password'))], "Passwords must match").required("Please confirm your password")
})