import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
    Container,
    Box,
    TextField,
    Button,
    Typography,
    Alert,
    CircularProgress,
    Paper,
} from "@mui/material";
import { AuthContext } from "../../context/AuthContext";

const Register = () => {
    const { register } = useContext(AuthContext);
    const navigate = useNavigate();

    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
    });

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const validateForm = () => {
        if (!form.firstName || !form.email || !form.password) {
            return "First name, email and password are required";
        }

        if (form.password.length < 6) {
            return "Password must be at least 6 characters";
        }

        return null;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");
        setSuccess(false);

        const validationError = validateForm();
        if (validationError) {
            setError(validationError);
            return;
        }

        try {
            setLoading(true);

            const response = await register(
                form.email,
                form.password,
                form.firstName,
                form.lastName
            );

            const errors =
                response.customerCreate.customerUserErrors;

            if (errors.length > 0) {
                setError(errors[0].message);
                return;
            }

            setSuccess(true);

            // Redirect to login after 1.5 sec
            setTimeout(() => {
                navigate("/login");
            }, 1500);
        } catch (err) {
            setError("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container maxWidth="sm" sx={{ mt: 8 }}>
            <Paper elevation={3} sx={{ p: 4 }}>
                <Typography variant="h5" gutterBottom>
                    Create Account
                </Typography>

                {error && (
                    <Alert severity="error" sx={{ mb: 2 }}>
                        {error}
                    </Alert>
                )}

                {success && (
                    <Alert severity="success" sx={{ mb: 2 }}>
                        Account created successfully! Redirecting to login...
                    </Alert>
                )}

                <Box component="form" onSubmit={handleSubmit}>
                    <TextField
                        fullWidth
                        label="First Name"
                        name="firstName"
                        margin="normal"
                        value={form.firstName}
                        onChange={handleChange}
                    />

                    <TextField
                        fullWidth
                        label="Last Name"
                        name="lastName"
                        margin="normal"
                        value={form.lastName}
                        onChange={handleChange}
                    />

                    <TextField
                        fullWidth
                        label="Email"
                        name="email"
                        type="email"
                        margin="normal"
                        value={form.email}
                        onChange={handleChange}
                    />

                    <TextField
                        fullWidth
                        label="Password"
                        name="password"
                        type="password"
                        margin="normal"
                        value={form.password}
                        onChange={handleChange}
                    />

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3 }}
                        disabled={loading}
                    >
                        {loading ? <CircularProgress size={24} /> : "Register"}
                    </Button>
                </Box>

                <Typography sx={{ mt: 3 }}>
                    Already have an account?{" "}
                    <Button onClick={() => navigate("/login")}>
                        Login
                    </Button>
                </Typography>
            </Paper>
        </Container>
    );
};

export default Register;
