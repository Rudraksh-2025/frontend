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
                pt: { xs: 8, md: 4 },
                pb: 4,
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
                            JOIN THE <br />
                            <Box component="span" sx={{ WebkitTextStroke: "1px #fff", color: "transparent" }}>
                                MOVEMENT.
                            </Box>
                        </Typography>
                        <Typography
                            variant="body2"
                            sx={{ color: "rgba(255,255,255,0.5)", letterSpacing: 1, textTransform: "uppercase" }}
                        >
                            Forge your path. Start your journey with KAVR.
                        </Typography>
                    </Box>

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

                                const errors = response.customerCreate.customerUserErrors;

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
                            <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
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

                                <Box sx={{ display: 'flex', gap: 2 }}>
                                    <TextField
                                        fullWidth
                                        label="FIRST NAME"
                                        name="firstName"
                                        variant="outlined"
                                        value={values.firstName}
                                        onChange={handleChange}
                                        error={touched.firstName && Boolean(errors.firstName)}
                                        helperText={touched.firstName && errors.firstName}
                                        sx={textFieldStyle}
                                    />
                                    <TextField
                                        fullWidth
                                        label="LAST NAME"
                                        name="lastName"
                                        variant="outlined"
                                        value={values.lastName}
                                        onChange={handleChange}
                                        sx={textFieldStyle}
                                    />
                                </Box>

                                <TextField
                                    fullWidth
                                    label="EMAIL"
                                    name="email"
                                    variant="outlined"
                                    value={values.email}
                                    onChange={handleChange}
                                    error={touched.email && Boolean(errors.email)}
                                    helperText={touched.email && errors.email}
                                    sx={textFieldStyle}
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
                                    sx={textFieldStyle}
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
                                    {isSubmitting ? <CircularProgress size={24} sx={{ color: "#fff" }} /> : "CREATE ACCOUNT"}
                                </Button>

                                <Box sx={{ textAlign: "center", mt: 2 }}>
                                    <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.5)", letterSpacing: 1 }}>
                                        ALREADY HAVE AN ACCOUNT?{" "}
                                        <Box
                                            component="span"
                                            onClick={() => navigate('/login')}
                                            sx={{
                                                color: "#fff",
                                                fontWeight: 700,
                                                cursor: "pointer",
                                                textDecoration: "underline",
                                                "&:hover": { color: "rgba(255,255,255,0.8)" }
                                            }}
                                        >
                                            LOGIN
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

const textFieldStyle = {
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
};

export default Register;
