import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { TextField, Button, Container, Typography } from "@mui/material";

const Login = () => {
    const { login } = useContext(AuthContext);
    const [form, setForm] = useState({ email: "", password: "" });

    const handleSubmit = async () => {
        await login(form.email, form.password);
        setTimeout(() => {
            navigate("/");
        }, 1500);
    };

    return (
        <Container maxWidth="sm" sx={{ mt: 6 }}>
            <Typography variant="h5">Login</Typography>
            <TextField fullWidth label="Email" margin="normal"
                onChange={(e) => setForm({ ...form, email: e.target.value })} />
            <TextField fullWidth label="Password" type="password" margin="normal"
                onChange={(e) => setForm({ ...form, password: e.target.value })} />
            <Button variant="contained" fullWidth onClick={handleSubmit}>
                Login
            </Button>
        </Container>
    );
};

export default Login;
