import {useState} from "react";
import {useFormik} from "formik";
import {validationSchema} from "../Validation/PasswordResetValidation";
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import LockResetIcon from "@mui/icons-material/LockReset";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import {Alert} from "@mui/material";
import * as React from "react";


const PasswordReset = () => {
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const {resetToken} = useParams();

    const formik: any = useFormik({
        initialValues: {
            password: "",
            confirmPassword: ""
        },
        onSubmit: async (values) => {
            await handleSubmit(values);
        },
        validationSchema: validationSchema
    })

    const handleSubmit = async (values: any) => {
        setError("");
        const password = values.password;
        try {
            const res = await axios.put(
                `https://web4-sm.herokuapp.com/api/users/reset-password/${resetToken}`,
                {password}
            );
            setSuccess(res.data);
            setTimeout(() => {
                navigate("/signIn");
            }, 5000)

        } catch (err: any) {
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
                        Please enter your new password below.
                    </Typography>
                    <Box component="form" noValidate onSubmit={formik.handleSubmit} sx={{mt: 3}}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    label="New password"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                    value={formik.values.password}
                                    onChange={formik.handleChange}
                                    error={formik.touched.password && Boolean(formik.errors.password)}
                                    helperText={formik.touched.password && formik.errors.password}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="confirmPassword"
                                    label="Confirm password"
                                    type="password"
                                    id="confirmPassword"
                                    autoComplete="new-password"
                                    value={formik.values.confirmPassword}
                                    onChange={formik.handleChange}
                                    error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                                    helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
                                />
                            </Grid>
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
                    Success. Your password has been reset. Navigating back to sign in page.
                </Alert>}
                {error && <Alert variant="filled" severity="error">
                    That password reset URL has expired. Please generate a new one by navigating back to the login page.
                </Alert>}
            </Container>
        </ThemeProvider>
    );
}

export default PasswordReset;