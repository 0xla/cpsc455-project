// Material UI Imports
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {createTheme, ThemeProvider} from '@mui/material/styles';

// Form validation imports
import {useFormik} from "formik";
import {validationSchema} from "../Validation/SignUpValidation";

// React Imports
import * as React from 'react';
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import {Alert} from "@mui/material";
import TEXT from "../statics/text";
import { base_be_url } from '../util/constants';
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";

function Copyright(props: any) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            {TEXT.COMMON.TITLE + " "}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const theme = createTheme();

export default function SignUp() {

    const [invalidSignup, setInvalidSignup] = useState(false);
    const [isSigningUp, setIsSigningUp] = useState(false);

    const navigate = useNavigate();

    const formik: any = useFormik( {
        initialValues: {
            username: "",
            email: "",
            password: ""
        },
        onSubmit: async (values) => {
            await handleSubmit(values);

        },
        validationSchema: validationSchema
    })

    const handleSubmit = async (values: any) => {
        const username = values.username;
        const email = values.email;
        const password = values.password;

        try {
            await trySignup(username, email, password);
            navigate(`/${username}`)
        } catch (err) {
            console.log("Error signing up")
        }
    }

    const trySignup = async (username: string, email: string, password: string) => {
        let response: any;

        try {
            setIsSigningUp(true)
            response = await axios.post(
                `${base_be_url}/api/users/register`, {
                    username: username,
                    email: email,
                    password: password,
                }
            )
        } catch (err: any) {
            const errors = err.response.data.errors
            if (errors) {
                Object.values(errors).forEach((err) => {
                    if (err !== "") {
                        setInvalidSignup(true)
                    }
                })
                throw new Error(err.response.data.message)
            }
        } finally {
            setIsSigningUp(false)
        }

        const data = response.data
        localStorage.setItem("authToken", data.token);
    }

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
                    <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>

                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                    <Box component="form" noValidate onSubmit={formik.handleSubmit} sx={{mt: 3}}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="username"
                                    label="Username"
                                    name="username"
                                    autoComplete="username"
                                    value={formik.values.username}
                                    onChange = {formik.handleChange}
                                    error={formik.touched.username && Boolean(formik.errors.username)} // avoids form loading and showing errors without form being touched
                                    helperText={formik.touched.username && formik.errors.username}
                                />
                            </Grid>
                            <Grid item xs={12}>
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
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                    value={formik.values.password}
                                    onChange = {formik.handleChange}
                                    error={formik.touched.password && Boolean(formik.errors.password)}
                                    helperText={formik.touched.password && formik.errors.password}
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{mt: 3, mb: 2}}
                        >
                            Sign Up
                        </Button>
                        {isSigningUp && <CircularProgress />}
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link href="/signIn" variant="body2">
                                    Already have an account? Sign in
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                {invalidSignup && <Alert variant="filled" severity="error">
                    Sorry, that username or email is already taken.
                </Alert>}
                <Copyright sx={{mt: 5}}/>
            </Container>
        </ThemeProvider>
    );
}