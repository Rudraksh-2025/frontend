import { Box, Typography, Button, Container } from "@mui/material";
import { motion } from "framer-motion";
import { useTheme, useMediaQuery } from "@mui/material";
// backgroundImage: `url(${window.sliderImages?.[0]})`
const Hero = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));
    return (
        <Box
            data-cursor-color="white"
            sx={{
                height: "100vh",
                width: "100%",
                position: "relative",
                backgroundColor: "#000",
                display: "flex",
                alignItems: "center",
                overflow: "hidden",
            }}
        >
            {/* Background Video */}
            <Box
                component="video"
                autoPlay
                key={isMobile ? "mobile" : "desktop"}
                muted
                loop
                playsInline
                sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    zIndex: 0,
                    filter: "brightness(0.7)", // Subtle darkening for accessibility
                }}
            >
                <source src={isMobile ? "/heroMobile.mp4" : "/hero.mp4"} type="video/mp4" loop />
            </Box>

            {/* Cinematic Gradient Overlay */}
            <Box
                sx={{
                    position: "absolute",
                    inset: 0,
                    zIndex: 1,
                    background: "radial-gradient(circle at 30% 50%, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.6) 70%, rgba(0,0,0,0.8) 100%)",
                }}
            />

            <Container maxWidth="lg" sx={{ position: "relative", zIndex: 2 }}>
                <Box sx={{ maxWidth: { xs: "100%", md: "60%" } }}>
                    {/* Bold Main Heading with Animation */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <Typography
                            variant="h1"
                            sx={{
                                color: "#fff",
                                fontWeight: 900,
                                fontSize: { xs: "3.5rem", md: "6rem", lg: "7.5rem" },
                                lineHeight: 0.9,
                                letterSpacing: -2,
                                mb: 1,
                                textTransform: "uppercase",
                                fontStyle: "italic",
                            }}
                        >
                            CARVED BY<br />
                            <Box component="span" sx={{ WebkitTextStroke: { xs: "1px #fff", md: "2px #fff" }, color: "transparent" }}>
                                THE GRIND.
                            </Box>
                        </Typography>
                    </motion.div>

                    {/* Manifesto Text with Animation */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                    >
                        <Typography
                            variant="body1"
                            sx={{
                                color: "rgba(255,255,255,0.8)",
                                fontSize: { xs: "0.9rem", md: "1.1rem" },
                                pl: 1,
                                lineHeight: 1.6,
                                maxWidth: "500px",
                                mb: 3,
                                mt: 3,
                                fontWeight: 300,
                                letterSpacing: 0.5,
                            }}
                        >
                            BORN IN THE SHADOWS. FORGED THROUGH THE STRUGGLE.
                            WE DON'T JUST WEAR THE PRODUCT. WE ARE CARVED BY THE PROCESS.
                            LUXURY STREETWEAR FOR THE UNSTOPPABLE.
                        </Typography>
                    </motion.div>

                    {/* CTA Section with Animation */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                    >
                        <Box sx={{ display: 'flex', justifyContent: 'start' }}>
                            <Button
                                variant="outlined"
                                sx={{
                                    borderColor: "#fff",
                                    color: "#fff",
                                    px: 5,
                                    py: 1.5,
                                    width: { xs: '100%', md: 'fit-content' },
                                    fontSize: "0.9rem",
                                    fontWeight: 800,
                                    borderRadius: 0, // Changed to match industrial grind aesthetic
                                    letterSpacing: 2,
                                    "&:hover": {
                                        borderColor: "#fff",
                                        backgroundColor: "#fff",
                                        color: "#000",
                                    },
                                }}
                            >
                                EXPLORE COLLECTION
                            </Button>
                        </Box>
                    </motion.div>
                </Box>
            </Container>

            {/* Scroll Indicator */}
            <Box
                sx={{
                    position: "absolute",
                    bottom: 40,
                    left: "50%",
                    transform: "translateX(-50%)",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 1,
                    opacity: 0.6,
                    zIndex: 2,
                }}
            >
                <Box
                    sx={{
                        width: "1px",
                        height: "60px",
                        backgroundColor: "#fff",
                        position: "relative",
                        overflow: "hidden",
                        "&::after": {
                            content: '""',
                            position: "absolute",
                            top: 0,
                            left: 0,
                            width: "100%",
                            height: "100%",
                            background: "linear-gradient(transparent, #fff)",
                            animation: "scrollDown 2s infinite ease-in-out",
                        },
                        "@keyframes scrollDown": {
                            "0%": { transform: "translateY(-100%)" },
                            "100%": { transform: "translateY(100%)" },
                        },
                    }}
                />
            </Box>
        </Box>
    );
};


export default Hero;
