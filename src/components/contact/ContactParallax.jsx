import { Box, Typography } from "@mui/material";

const ContactParallax = () => {
    return (
        <Box
            sx={{
                height: "60vh",
                backgroundImage:
                    "url('./contactParallax.jpg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundAttachment: "fixed",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
            }}
        >
            {/* Overlay */}
            <Box
                sx={{
                    position: "absolute",
                    inset: 0,
                    background: "rgba(0,0,0,0.5)",
                }}
            />

            {/* Content */}
            <Box
                sx={{
                    position: "relative",
                    textAlign: "center",
                    color: "#fff",
                    maxWidth: 700,
                    px: 3,
                }}
            >
                <Typography variant="h3" fontWeight={600} gutterBottom>
                    Get In Touch
                </Typography>

                <Typography variant="h6" sx={{ opacity: 0.9 }}>
                    Have questions or need assistance? We’re here to help.
                    Reach out for inquiries or personalized support.
                </Typography>
            </Box>
        </Box>
    );
};

export default ContactParallax;
