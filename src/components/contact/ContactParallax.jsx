import { Box, Typography, Container } from "@mui/material";
import ScrollReveal from "../common/ScrollReveal";

const ContactParallax = () => {
    return (
        <Box
            data-cursor-color="white"
            sx={{
                height: "60vh",
                backgroundImage: "url('/contactParallax.jpg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundAttachment: "fixed",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
                overflow: "hidden",
            }}
        >
            {/* Overlay */}
            <Box
                sx={{
                    position: "absolute",
                    inset: 0,
                    background: "rgba(0,0,0,0.6)",
                }}
            />

            {/* Content */}
            <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1, textAlign: "center" }}>
                <ScrollReveal>
                    <Typography
                        variant="h1"
                        sx={{
                            color: "#fff",
                            fontWeight: 900,
                            fontSize: { xs: "3rem", md: "5rem", lg: "6rem" },
                            lineHeight: 1,
                            letterSpacing: -2,
                            textTransform: "uppercase",
                            mb: 2,
                        }}
                    >
                        GET IN<Box component="span" sx={{ WebkitTextStroke: "1px #fff", color: "transparent" }}> TOUCH</Box>
                    </Typography>
                    <Typography
                        variant="body1"
                        sx={{
                            color: "rgba(255,255,255,0.8)",
                            fontSize: { xs: "0.9rem", md: "1.1rem" },
                            maxWidth: "600px",
                            margin: "0 auto",
                            letterSpacing: 1,
                            fontWeight: 300,
                        }}
                    >
                        INQUIRIES. COLLABORATIONS. FEEDBACK. <br />
                        WHATEVER YOUR PATH, WE ARE HERE TO NAVIGATE THE GRIND WITH YOU.
                    </Typography>
                </ScrollReveal>
            </Container>
        </Box>
    );
};

export default ContactParallax;

