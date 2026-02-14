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

const RegisterSchema = Yup.object().shape({
    firstName: Yup.string().required("First name required"),
    lastName: Yup.string(),
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string()
        .min(6, "Minimum 6 characters")
        .required("Required"),
});

const Register = () => {
    const { register } = useContext(AuthContext);
    const navigate = useNavigate();

    return (
        <Container maxWidth="sm" sx={{ mt: 10 }}>
            <Paper elevation={4} sx={{ p: 5, borderRadius: 3 }}>
                <Typography variant="h4" fontWeight={600} mb={3}>
                    Create Account
                </Typography>

                <Formik
                    initialValues={{
                        firstName: "",
                        lastName: "",
                        email: "",
                        password: "",
                    }}
                    validationSchema={RegisterSchema}
                    onSubmit={async (values, { setSubmitting, setStatus }) => {
                        try {
                            const response = await register(
                                values.email,
                                values.password,
                                values.firstName,
                                values.lastName
                            );

                            const errors =
                                response.customerCreate.customerUserErrors;

                            if (errors.length > 0) {
                                setStatus(errors[0].message);
                                return;
                            }

                            navigate("/login");
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
                                label="First Name"
                                name="firstName"
                                margin="normal"
                                value={values.firstName}
                                onChange={handleChange}
                                error={touched.firstName && Boolean(errors.firstName)}
                                helperText={touched.firstName && errors.firstName}
                            />

                            <TextField
                                fullWidth
                                label="Last Name"
                                name="lastName"
                                margin="normal"
                                value={values.lastName}
                                onChange={handleChange}
                            />

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
                                type="password"
                                name="password"
                                margin="normal"
                                value={values.password}
                                onChange={handleChange}
                                error={touched.password && Boolean(errors.password)}
                                helperText={touched.password && errors.password}
                            />
                            <Typography>Already have an account?
                                <span onClick={() => navigate('/login')}> Login</span>
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
                                    "Create Account"
                                )}
                            </Button>
                        </Box>
                    )}
                </Formik>
            </Paper>
        </Container>
    );
};

export default Register;
