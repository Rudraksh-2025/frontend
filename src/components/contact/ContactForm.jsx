import { useState } from "react";
import {
    Box,
    Typography,
    Grid,
    TextField,
    Button,
    Paper,
    Stack,
    Snackbar,
    Alert
} from "@mui/material";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";


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
    return (
        <Box sx={{ px: { xs: 3, md: 10 }, py: 5, bgcolor: "#f8f8f8" }}>
            <Grid container spacing={{ xs: 3, md: 6 }}>

                {/* LEFT SIDE INFO */}
                <Grid size={{ xs: 12, md: 6 }} sx={{ pl: 2, pt: { xs: 0, md: 2 } }}>
                    <Typography variant="h3" fontWeight={600} gutterBottom>
                        Get in Touch
                    </Typography>

                    <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
                        We’d love to hear from you. Whether you're buying, selling,
                        or just exploring — reach out!
                    </Typography>

                    <Stack spacing={3}>
                        <Box display="flex" alignItems="center" gap={2}>
                            <EmailIcon />
                            <Typography>support@kevr.com</Typography>
                        </Box>

                        <Box display="flex" alignItems="center" gap={2}>
                            <PhoneIcon />
                            <Typography>+91 95125 78889</Typography>
                        </Box>

                        <Typography color="text.secondary">
                            Premium streetwear brand built for bold expression.
                        </Typography>
                    </Stack>
                </Grid>

                {/* RIGHT SIDE FORM */}
                <Grid size={{ xs: 12, md: 6 }}>
                    <Paper
                        elevation={0}
                        sx={{
                            p: { xs: 3, md: 5 },
                            borderRadius: 2,
                            border: "1px solid #eee",
                        }}
                    >
                        <Stack spacing={3}>
                            <Grid container spacing={2}>
                                <Grid size={{ xs: 12, sm: 6 }}>
                                    <TextField
                                        label="First Name"
                                        name="firstName"
                                        value={form.firstName}
                                        onChange={handleChange}
                                        fullWidth
                                        size="small"
                                    />
                                </Grid>
                                <Grid size={{ xs: 12, sm: 6 }}>
                                    <TextField
                                        label="Phone"
                                        name="phone"
                                        value={form.phone}
                                        onChange={handleChange}
                                        fullWidth
                                        size="small"
                                    />
                                </Grid>
                            </Grid>

                            <TextField
                                label="Email"
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                                fullWidth
                                size="small"
                            />
                            <TextField
                                label="Message"
                                name="message"
                                value={form.message}
                                onChange={handleChange}
                                multiline
                                rows={4}
                                fullWidth
                            />


                            <Button
                                variant="contained"
                                onClick={handleSubmit}
                                disabled={loading}
                                sx={{
                                    bgcolor: "#000",
                                    "&:hover": { bgcolor: "#222" },
                                }}
                            >
                                {loading ? "Submitting..." : "Submit"}
                            </Button>
                        </Stack>
                    </Paper>
                </Grid>
            </Grid>
            <Snackbar
                open={success}
                autoHideDuration={3000}
                onClose={() => setSuccess(false)}
            >
                <Alert severity="success">Message sent successfully!</Alert>
            </Snackbar>
        </Box>
    );
};

export default ContactForm;
