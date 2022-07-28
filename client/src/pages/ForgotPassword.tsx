// Material UI Imports
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {Alert} from "@mui/material";
import LockResetIcon from '@mui/icons-material/LockReset';

// Form validation imports
import {useFormik} from "formik";
import {validationSchema} from "../Validation/EmailValidation";

// React Imports
import * as React from 'react';
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import Container from "@mui/material/Container";
import axios from "axios";

axios.defaults.baseURL = process.env.REACT_APP_BASE_BE_URL;

const ForgotPassword = () => {
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");

    const formik: any = useFormik( {
        initialValues: {
            email: ""
        },
        onSubmit: async (values) => {
            await handleSubmit(values);
        },
        validationSchema: validationSchema
    })

    const navigate = useNavigate();

    const handleSubmit = async (values: any) => {
        setError("");
        const email = values.email;

        console.log(email)
        try {
            const res = await axios.post(
                "/api/users/forgot-password",
                {email}
            );
            setSuccess(res.data);
            setTimeout( () => {
                navigate("/signIn");
            }, 5000)

        } catch (err: any){
            setError(err.response.data);
        }
    };

    const theme = createTheme();

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline/>
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <LockResetIcon sx={{m: 1}}>

                    </LockResetIcon>
                    <Typography component="h1" variant="h5">
                        Lost your password?
                        Please enter your email address.
                        You will receive a link to create a new password via email.
                    </Typography>
                    <Box component="form" noValidate onSubmit={formik.handleSubmit} sx={{mt: 3}}>
                            <Grid item xs={8}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    value={formik.values.email}
                                    onChange = {formik.handleChange}
                                    error={formik.touched.email && Boolean(formik.errors.email)} // avoids form loading and showing errors without form being touched
                                    helperText={formik.touched.email && formik.errors.email}
                                />
                            </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{mt: 3, mb: 2}}
                        >
                            Reset password
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link href="/signIn" variant="body2">
                                    Remember your password?
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                {success && <Alert variant="filled" severity="success">
                    Success. Check your email. Redirecting you to the sign in page.
                </Alert>}
                {error && <Alert variant="filled" severity="error">
                    That email is not associated with an account.
                </Alert>}
            </Container>
        </ThemeProvider>
    );
}

export default ForgotPassword;