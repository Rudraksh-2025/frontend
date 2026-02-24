import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
    Container,
    Box,
    TextField,
    Button,
    Typography,
    Alert,
    CircularProgress,
} from "@mui/material";
import { motion } from "framer-motion";
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
        <Box
            data-cursor-color="white"
            sx={{
                minHeight: "100vh",
                width: "100%",
                backgroundColor: "#000",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
                overflow: "hidden",
                pt: { xs: 8, md: 0 },
            }}
        >
            {/* Cinematic Background Gradient */}
            <Box
                sx={{
                    position: "absolute",
                    inset: 0,
                    zIndex: 0,
                    background: "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.05) 0%, rgba(0,0,0,0) 70%)",
                }}
            />

            <Container maxWidth="xs" sx={{ position: "relative", zIndex: 1 }}>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <Box sx={{ mb: 6, textAlign: "center" }}>
                        <Typography
                            variant="h3"
                            sx={{
                                color: "#fff",
                                fontWeight: 900,
                                textTransform: "uppercase",
                                fontStyle: "italic",
                                letterSpacing: -1,
                                mb: 1,
                            }}
                        >
                            WELCOME <br />
                            <Box component="span" sx={{ WebkitTextStroke: "1px #fff", color: "transparent" }}>
                                BACK.
                            </Box>
                        </Typography>
                        <Typography
                            variant="body2"
                            sx={{ color: "rgba(255,255,255,0.5)", letterSpacing: 1, textTransform: "uppercase" }}
                        >
                            Enter your credentials to continue the grind.
                        </Typography>
                    </Box>

                    <Formik
                        initialValues={{ email: "", password: "" }}
                        validationSchema={LoginSchema}
                        onSubmit={async (values, { setSubmitting, setStatus }) => {
                            try {
                                const response = await login(values.email, values.password);
                                const errors = response.customerAccessTokenCreate.customerUserErrors;

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
                            <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                                {status && (
                                    <Alert
                                        severity="error"
                                        sx={{
                                            borderRadius: 0,
                                            backgroundColor: "rgba(211, 47, 47, 0.1)",
                                            color: "#ff5252",
                                            border: "1px solid #ff5252"
                                        }}
                                    >
                                        {status}
                                    </Alert>
                                )}

                                <TextField
                                    fullWidth
                                    label="EMAIL"
                                    name="email"
                                    variant="outlined"
                                    value={values.email}
                                    onChange={handleChange}
                                    error={touched.email && Boolean(errors.email)}
                                    helperText={touched.email && errors.email}
                                    sx={{
                                        "& .MuiOutlinedInput-root": {
                                            color: "#fff",
                                            borderRadius: 0,
                                            "& fieldset": { borderColor: "rgba(255,255,255,0.3)" },
                                            "&:hover fieldset": { borderColor: "#fff" },
                                            "&.Mui-focused fieldset": { borderColor: "#fff" },
                                            "& input": { caretColor: "#fff" },
                                        },
                                        "& .MuiInputLabel-root": { color: "rgba(255,255,255,0.5)", letterSpacing: 1 },
                                        "& .MuiInputLabel-root.Mui-focused": { color: "#fff" },
                                    }}
                                />

                                <TextField
                                    fullWidth
                                    label="PASSWORD"
                                    name="password"
                                    type="password"
                                    variant="outlined"
                                    value={values.password}
                                    onChange={handleChange}
                                    error={touched.password && Boolean(errors.password)}
                                    helperText={touched.password && errors.password}
                                    sx={{
                                        "& .MuiOutlinedInput-root": {
                                            color: "#fff",
                                            borderRadius: 0,
                                            "& fieldset": { borderColor: "rgba(255,255,255,0.3)" },
                                            "&:hover fieldset": { borderColor: "#fff" },
                                            "&.Mui-focused fieldset": { borderColor: "#fff" },
                                            "& input": { caretColor: "#fff" },
                                        },
                                        "& .MuiInputLabel-root": { color: "rgba(255,255,255,0.5)", letterSpacing: 1 },
                                        "& .MuiInputLabel-root.Mui-focused": { color: "#fff" },
                                    }}
                                />

                                <Button
                                    fullWidth
                                    type="submit"
                                    variant="outlined"
                                    disabled={isSubmitting}
                                    sx={{
                                        borderColor: "#fff",
                                        color: "#fff",
                                        py: 1.5,
                                        fontSize: "0.9rem",
                                        fontWeight: 800,
                                        borderRadius: 0,
                                        letterSpacing: 2,
                                        mt: 2,
                                        "&:hover": {
                                            borderColor: "#fff",
                                            backgroundColor: "#fff",
                                            color: "#000",
                                        },
                                    }}
                                >
                                    {isSubmitting ? <CircularProgress size={24} sx={{ color: "#fff" }} /> : "LOGIN"}
                                </Button>

                                <Box sx={{ textAlign: "center", mt: 2 }}>
                                    <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.5)", letterSpacing: 1 }}>
                                        DON'T HAVE AN ACCOUNT?{" "}
                                        <Box
                                            component="span"
                                            onClick={() => navigate('/register')}
                                            sx={{
                                                color: "#fff",
                                                fontWeight: 700,
                                                cursor: "pointer",
                                                textDecoration: "underline",
                                                "&:hover": { color: "rgba(255,255,255,0.8)" }
                                            }}
                                        >
                                            REGISTER
                                        </Box>
                                    </Typography>
                                </Box>
                            </Box>
                        )}
                    </Formik>
                </motion.div>
            </Container>
        </Box>
    );
};

export default Login;
