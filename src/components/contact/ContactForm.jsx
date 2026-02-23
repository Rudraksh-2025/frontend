import { useState } from "react";
import {
    Box,
    Typography,
    Grid,
    TextField,
    Button,
    Container,
    Stack,
    Snackbar,
    Alert
} from "@mui/material";
import ScrollReveal from "../common/ScrollReveal";

const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbxezV7_a60D8miJ3HuimrctDC5by1AbEP7MX51tacu3B9XChFJPNg_NFqHSs7PtPPMA/exec"

const ContactForm = () => {
    const [form, setForm] = useState({
        firstName: "",
        phone: "",
        email: "",
        message: "",
    });

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        setLoading(true);

        try {
            await fetch(WEB_APP_URL, {
                method: "POST",
                mode: "no-cors",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(form),
            });

            setSuccess(true);
            setForm({
                firstName: "",
                phone: "",
                email: "",
                message: "",
            });
        } catch (err) {
            console.error(err);
        }

        setLoading(false);
    };

    const inputStyles = {
        "& .MuiOutlinedInput-root": {
            borderRadius: 0,
            "& fieldset": { borderColor: "rgba(0,0,0,0.1)" },
            "&:hover fieldset": { borderColor: "#000" },
            "&.Mui-focused fieldset": { borderColor: "#000" },
        },
        "& .MuiInputLabel-root": { color: "rgba(0,0,0,0.4)", fontWeight: 600, fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: 1 },
        "& .MuiInputLabel-root.Mui-focused": { color: "#000" },
    };

    return (
        <Box sx={{ py: { xs: 6, md: 8 }, bgcolor: "#fff", color: "#000" }}>
            <Container maxWidth="lg">
                <Grid container spacing={{ xs: 4, md: 12 }}>
                    {/* LEFT SIDE INFO */}
                    <Grid size={{ xs: 12, md: 5 }}>
                        <ScrollReveal direction="left">
                            <Typography
                                variant="h3"
                                sx={{
                                    fontWeight: 900,
                                    fontSize: { xs: "2.5rem", md: "3.2rem" },
                                    lineHeight: 1,
                                    letterSpacing: -1,
                                    textTransform: "uppercase",
                                    mb: 2,
                                }}
                            >
                                CONTACT
                                <Box component="span" sx={{ color: "rgba(0,0,0,0.3)" }}> US</Box>
                            </Typography>

                            <Typography sx={{ mb: 2, fontSize: "1.1rem", lineHeight: 1.6, fontWeight: 300 }}>
                                Whether you're inquiring about our latest arsenal, seeking a collaboration, or need technical deployment support — our team is on standby to assist your grind.
                            </Typography>

                            <Stack spacing={2}>
                                <Box>
                                    <Typography variant="overline" sx={{ letterSpacing: 1, fontWeight: 800, color: "rgba(0,0,0,0.4)" }}>EMAIL</Typography>
                                    <Typography sx={{ fontWeight: 600, fontSize: "1.1rem", mt: 0.5 }}>support@kevr.com</Typography>
                                </Box>

                                <Box>
                                    <Typography variant="overline" sx={{ letterSpacing: 1, fontWeight: 800, color: "rgba(0,0,0,0.4)" }}>INTEL LINE</Typography>
                                    <Typography sx={{ fontWeight: 600, fontSize: "1.1rem", mt: 0.5 }}>+91 95125 78889</Typography>
                                </Box>

                                <Box>
                                    <Typography variant="overline" sx={{ letterSpacing: 1, fontWeight: 800, color: "rgba(0,0,0,0.4)" }}>LOCATION</Typography>
                                    <Typography sx={{ fontWeight: 600, fontSize: "1.1rem", mt: 0.5 }}>FORGED IN INDIA</Typography>
                                </Box>
                            </Stack>
                        </ScrollReveal>
                    </Grid>

                    {/* RIGHT SIDE FORM */}
                    <Grid size={{ xs: 12, md: 7 }}>
                        <ScrollReveal direction="right">
                            <Stack spacing={4}>
                                <Grid container spacing={3}>
                                    <Grid size={{ xs: 12, sm: 6 }}>
                                        <TextField
                                            label="Name"
                                            name="firstName"
                                            value={form.firstName}
                                            onChange={handleChange}
                                            fullWidth
                                            variant="outlined"
                                            sx={inputStyles}
                                        />
                                    </Grid>
                                    <Grid size={{ xs: 12, sm: 6 }}>
                                        <TextField
                                            label="Phone Number"
                                            name="phone"
                                            value={form.phone}
                                            onChange={handleChange}
                                            fullWidth
                                            variant="outlined"
                                            sx={inputStyles}
                                        />
                                    </Grid>
                                </Grid>

                                <TextField
                                    label="EMAIL"
                                    name="email"
                                    value={form.email}
                                    onChange={handleChange}
                                    fullWidth
                                    variant="outlined"
                                    sx={inputStyles}
                                />
                                <TextField
                                    label="MESSAGE"
                                    name="message"
                                    value={form.message}
                                    onChange={handleChange}
                                    multiline
                                    rows={6}
                                    fullWidth
                                    variant="outlined"
                                    sx={inputStyles}
                                />

                                <Button
                                    variant="contained"
                                    onClick={handleSubmit}
                                    disabled={loading}
                                    sx={{
                                        bgcolor: "#000",
                                        color: "#fff",
                                        borderRadius: 0,
                                        py: 2,
                                        fontSize: "1rem",
                                        fontWeight: 800,
                                        letterSpacing: 2,
                                        textTransform: "uppercase",
                                        "&:hover": { bgcolor: "#333" },
                                    }}
                                >
                                    {loading ? "TRANSMITTING..." : "SEND MESSAGE"}
                                </Button>
                            </Stack>
                        </ScrollReveal>
                    </Grid>
                </Grid>
            </Container>
            <Snackbar
                open={success}
                autoHideDuration={3000}
                onClose={() => setSuccess(false)}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert
                    onClose={() => setSuccess(false)}
                    severity="success"
                    sx={{ width: '100%', borderRadius: 0, bgcolor: '#000', color: '#fff', '& .MuiAlert-icon': { color: '#fff' } }}
                >
                    MESSAGE RECEIVED. WE WILL RESPOND SHORTLY.
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default ContactForm;

