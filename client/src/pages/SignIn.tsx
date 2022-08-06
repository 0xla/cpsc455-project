// Material UI Imports
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Lock } from "@material-ui/icons";
import { Alert } from "@mui/material";

// Form validation imports
import { useFormik } from "formik";
import { validationSchema } from "../Validation/SignInValidation";

// React Imports
import * as React from 'react';
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import TEXT from "../statics/text";
import { setAuthToken } from "../slices/userSlice";
import { useDispatch } from "react-redux";
import {decodeToken} from "react-jwt";
import { base_be_url } from "../util/constants";
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

export default function SignInSide() {

    const [invalidLogin, setInvalidLogin] = useState(false);
    const [isSigningIn, setIsSigningIn] = useState(false);
    const dispatch = useDispatch();

    const formik: any = useFormik({
        initialValues: {
            username: "",
            password: ""
        },
        onSubmit: async (values) => {
            await handleSubmit(values);

        },
        validationSchema: validationSchema
    })

    const navigate = useNavigate();

    const handleSubmit = async (values: any) => {
        const usernameOrEmail = values.username;
        const password = values.password;

        try {
            await tryLogin(usernameOrEmail, password);
            // @ts-ignore
            const username = decodeToken(localStorage.getItem('authToken')).username;
            navigate(`/${username}`)
        } catch (err) {
            console.log("Error signing in")
        }
    };

    const tryLogin = async (usernameOrEmail: string, password: string) => {
        let response: any;
        try {
            setIsSigningIn(true)
            response = await axios.post(
                `${base_be_url}/api/users/login`, {
                    usernameOrEmail: usernameOrEmail,
                    password: password
                }
            )
        } catch (err: any) {
            const errors = err.response.data.errors
            if (errors) {
                Object.values(errors).forEach((err) => {
                    if (err !== "") {
                        setInvalidLogin(true)
                    }
                })
                throw new Error(err.response.data.message)
            }
        } finally {
            setIsSigningIn(false)
        }
        const data = response.data
        localStorage.setItem("authToken", data.token);
        dispatch(setAuthToken(data.token));
    }

    return (
        <ThemeProvider theme={theme}>
            <Grid container component="main" sx={{ height: '100vh' }}>
                <CssBaseline />
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{
                        backgroundImage: 'url(https://source.unsplash.com/random)',
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: (t) =>
                            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <Box
                        sx={{
                            my: 8,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <Lock />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign in
                        </Typography>
                        <Box component="form" noValidate onSubmit={formik.handleSubmit} sx={{ mt: 1 }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="username"
                                label="Username or email"
                                name="username"
                                autoComplete="username"
                                autoFocus
                                value={formik.values.username}
                                onChange={formik.handleChange}
                                error={formik.touched.username && Boolean(formik.errors.username)} // avoids form loading and showing errors without form being touched
                                helperText={formik.touched.username && formik.errors.username}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                error={formik.touched.password && Boolean(formik.errors.password)}
                                helperText={formik.touched.password && formik.errors.password}
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Sign In
                            </Button>
                            {isSigningIn && <CircularProgress />}
                            <Grid container>
                                <Grid item xs>
                                    <Link href="/forgot-password" variant="body2">
                                        Forgot password?
                                    </Link>
                                </Grid>
                                <Grid item>
                                    <Link href="/" variant="body2">
                                        {"Don't have an account? Sign Up"}
                                    </Link>
                                </Grid>
                            </Grid>
                            {invalidLogin && <Alert variant="filled" severity="error">
                                Sorry, your password was incorrect. Please double-check your password.
                            </Alert>}
                            <Copyright sx={{ mt: 5 }} />
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}