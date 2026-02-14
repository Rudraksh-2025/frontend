import {
    Dialog,
    DialogContent,
    Typography,
    TextField,
    Button,
    CircularProgress,
    Box,
    Alert,
} from "@mui/material";
import { useContext } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { AuthContext } from "../context/AuthContext";

const LoginSchema = Yup.object({
    email: Yup.string().email().required(),
    password: Yup.string().min(6).required(),
});

const LoginModal = ({ onSuccess }) => {
    const { loginOpen, closeLogin, login } = useContext(AuthContext);

    return (
        <Dialog open={loginOpen} onClose={closeLogin} maxWidth="xs" fullWidth>
            <DialogContent sx={{ p: 4 }}>
                <Typography variant="h5" mb={3}>
                    Login to Continue
                </Typography>

                <Formik
                    initialValues={{ email: "", password: "" }}
                    validationSchema={LoginSchema}
                    onSubmit={async (values, { setSubmitting, setStatus }) => {
                        const res = await login(values.email, values.password);

                        const errors =
                            res.customerAccessTokenCreate.customerUserErrors;

                        if (errors.length > 0) {
                            setStatus(errors[0].message);
                            setSubmitting(false);
                            return;
                        }

                        closeLogin();
                        onSuccess(); // 🔥 redirect to checkout
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
                            {status && <Alert severity="error">{status}</Alert>}

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

                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 2 }}
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
            </DialogContent>
        </Dialog>
    );
};

export default LoginModal;
