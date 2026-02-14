import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
    Container,
    Box,
    TextField,
    Button,
    Typography,
    Paper,
    Alert,
    CircularProgress,
} from "@mui/material";
import { Formik } from "formik";
import * as Yup from "yup";
import { AuthContext } from "../../context/AuthContext";

const LoginSchema = Yup.object().shape({
    email: Yup.string()
        .email("Invalid email")
        .required("Email is required"),
    password: Yup.string()
        .min(6, "Minimum 6 characters")
        .required("Password is required"),
});

const Login = () => {
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    return (
        <Container maxWidth="sm" sx={{ mt: 10 }}>
            <Paper elevation={4} sx={{ p: 5, borderRadius: 3 }}>
                <Typography variant="h4" fontWeight={600} mb={3}>
                    Welcome Back
                </Typography>

                <Formik
                    initialValues={{ email: "", password: "" }}
                    validationSchema={LoginSchema}
                    onSubmit={async (values, { setSubmitting, setStatus }) => {
                        try {
                            const response = await login(values.email, values.password);

                            const errors =
                                response.customerAccessTokenCreate.customerUserErrors;

                            if (errors.length > 0) {
                                setStatus(errors[0].message);
                                return;
                            }

                            navigate("/");
                        } catch {
                            setStatus("Something went wrong");
                        } finally {
                            setSubmitting(false);
                        }
                    }}
                >
                    {({
                        values,
                        errors,
                        touched,
                        handleChange,
                        handleSubmit,
                        isSubmitting,
                        status,
                    }) => (
                        <Box component="form" onSubmit={handleSubmit}>
                            {status && (
                                <Alert severity="error" sx={{ mb: 2 }}>
                                    {status}
                                </Alert>
                            )}

                            <TextField
                                fullWidth
                                label="Email"
                                name="email"
                                margin="normal"
                                value={values.email}
                                onChange={handleChange}
                                error={touched.email && Boolean(errors.email)}
                                helperText={touched.email && errors.email}
                            />

                            <TextField
                                fullWidth
                                label="Password"
                                name="password"
                                type="password"
                                margin="normal"
                                value={values.password}
                                onChange={handleChange}
                                error={touched.password && Boolean(errors.password)}
                                helperText={touched.password && errors.password}
                            />
                            <Typography>Dont have an account?
                                <span onClick={() => navigate('/register')}> Register</span>
                            </Typography>

                            <Button
                                fullWidth
                                type="submit"
                                variant="contained"
                                size="large"
                                sx={{ mt: 3, py: 1.5, borderRadius: 2 }}
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? (
                                    <CircularProgress size={22} />
                                ) : (
                                    "Login"
                                )}
                            </Button>
                        </Box>
                    )}
                </Formik>
            </Paper>
        </Container>
    );
};

export default Login;
