import { Box, Typography, Button, Container } from "@mui/material";
import { motion } from "framer-motion";
import { useTheme, useMediaQuery } from "@mui/material";
import { useEffect, useRef, useCallback } from "react";
import { gsap } from "gsap";

// Split text into individual animated letter spans
const LetterStagger = ({ text, delay = 0, style = {}, className = "" }) => {
    const lettersRef = useRef([]);

    const addRef = useCallback((el) => {
        if (el && !lettersRef.current.includes(el)) {
            lettersRef.current.push(el);
        }
    }, []);

    useEffect(() => {
        if (!lettersRef.current.length) return;

        gsap.set(lettersRef.current, { opacity: 0, y: 80, rotateX: -90, scale: 0.5 });

        gsap.to(lettersRef.current, {
            opacity: 1,
            y: 0,
            rotateX: 0,
            scale: 1,
            duration: 0.9,
            stagger: 0.04,
            delay,
            ease: "back.out(1.7)",
        });

        return () => {
            lettersRef.current = [];
        };
    }, [delay]);

    return (
        <span className={className} style={{ display: "inline-block", ...style }}>
            {text.split("").map((char, i) => (
                <span
                    key={i}
                    ref={addRef}
                    style={{
                        display: "inline-block",
                        willChange: "transform, opacity",
                        opacity: 0,
                        ...(char === " " ? { width: "0.3em" } : {}),
                    }}
                >
                    {char === " " ? "\u00A0" : char}
                </span>
            ))}
        </span>
    );
};

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
                preload="auto"
                playsInline
                sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    zIndex: 0,
                    filter: "brightness(0.7)",
                }}
            >
                {/* <source src={isMobile ? "/heroMobile.mp4" : "/hero.mp4"} 
                type="video/mp4" loop /> */}
                <source
                    src={isMobile ? "https://cdn.shopify.com/videos/c/o/v/439aeef8e8bf434d805a2f6a54ccae78.mp4" : "https://cdn.shopify.com/videos/c/o/v/7a5c3e52bfe748cdb44b24b6ecd03488.mp4"}
                    type="video/mp4"
                />
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
                <Box sx={{ maxWidth: { xs: "100%", md: "65%" } }}>
                    {/* Bold Main Heading with Letter Stagger */}
                    <Typography
                        variant="h1"
                        component="div"
                        sx={{
                            pt: 2,
                            color: "#fff",
                            fontWeight: 900,
                            fontSize: { xs: "3.5rem", md: "6rem", lg: "7.5rem" },
                            lineHeight: 0.9,
                            letterSpacing: -2,
                            mb: 1,
                            textTransform: "uppercase",
                            fontStyle: { xs: "normal", md: 'italic' },
                            overflow: "hidden",
                        }}
                    >
                        <LetterStagger text="CARVED BY" delay={0.3} />
                        <br />
                        <LetterStagger
                            text="THE GRIND."
                            delay={0.9}
                            style={{ WebkitTextStroke: isMobile ? "1px #fff" : "2px #fff", color: "transparent" }}
                        />
                    </Typography>

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
                    {/* <motion.div
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
                    </motion.div> */}
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
