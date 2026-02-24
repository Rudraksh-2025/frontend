import { useState, useEffect } from "react";
import { Box, Typography, Button, Container } from "@mui/material";

const CountdownSale = () => {
    // Set target date to 24 hours from now for demonstration
    const [timeLeft, setTimeLeft] = useState({
        hours: 16,
        minutes: 45,
        seconds: 1,
    });

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                let { hours, minutes, seconds } = prev;
                if (seconds > 0) {
                    seconds--;
                } else {
                    if (minutes > 0) {
                        minutes--;
                        seconds = 59;
                    } else {
                        if (hours > 0) {
                            hours--;
                            minutes = 59;
                            seconds = 59;
                        }
                    }
                }
                return { hours, minutes, seconds };
            });
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const formatNumber = (num) => String(num).padStart(2, "0");

    return (
        <Box
            data-cursor-color="white"
            sx={{
                height: { xs: "500px", md: "600px" },
                width: "100%",
                position: "relative",
                // backgroundImage: "url('/image2.png')",
                backgroundImage: `url(${window.sliderImages?.[7]})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                color: "#fff",
                mt: 4
            }}
        >
            {/* Subtle Overlay to make text readable */}
            <Box
                sx={{
                    position: "absolute",
                    inset: 0,
                    background: "rgba(0,0,0,0.2)",
                }}
            />

            <Container sx={{ position: "relative", zIndex: 1 }}>
                <Typography
                    variant="overline"
                    sx={{
                        fontSize: { xs: "0.7rem", md: "0.9rem" },
                        letterSpacing: 4,
                        fontWeight: 700,
                        mb: 1,
                        display: "block",
                        opacity: 0.9,
                    }}
                >
                    LIMITED TIME ONLY
                </Typography>

                <Typography
                    variant="h2"
                    sx={{
                        fontSize: { xs: "3rem", md: "5rem" },
                        fontWeight: 300,
                        fontFamily: "'Inter', sans-serif",
                        mb: 4,
                        letterSpacing: -1,
                    }}
                >
                    Summer Sale
                </Typography>

                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        gap: { xs: 3, md: 5 },
                        mb: 5,
                    }}
                >
                    <Box>
                        <Typography variant="h3" sx={{ fontWeight: 400, fontSize: { xs: "2.5rem", md: "3.5rem" } }}>
                            {formatNumber(timeLeft.hours)}
                        </Typography>
                        <Typography variant="caption" sx={{ letterSpacing: 2, opacity: 0.8 }}>
                            HOUR
                        </Typography>
                    </Box>
                    <Typography variant="h3" sx={{ fontWeight: 400, pt: 1 }}>:</Typography>
                    <Box>
                        <Typography variant="h3" sx={{ fontWeight: 400, fontSize: { xs: "2.5rem", md: "3.5rem" } }}>
                            {formatNumber(timeLeft.minutes)}
                        </Typography>
                        <Typography variant="caption" sx={{ letterSpacing: 2, opacity: 0.8 }}>
                            MIN
                        </Typography>
                    </Box>
                    <Typography variant="h3" sx={{ fontWeight: 400, pt: 1 }}>:</Typography>
                    <Box>
                        <Typography variant="h3" sx={{ fontWeight: 400, fontSize: { xs: "2.5rem", md: "3.5rem" } }}>
                            {formatNumber(timeLeft.seconds)}
                        </Typography>
                        <Typography variant="caption" sx={{ letterSpacing: 2, opacity: 0.8 }}>
                            SEC
                        </Typography>
                    </Box>
                </Box>

                <Button
                    variant="contained"
                    sx={{
                        backgroundColor: "#fff",
                        color: "#000",
                        px: 6,
                        py: 1.5,
                        fontSize: "0.9rem",
                        fontWeight: 600,
                        borderRadius: 0,
                        "&:hover": {
                            backgroundColor: "rgba(255,255,255,0.9)",
                        },
                    }}
                >
                    SHOP NOW
                </Button>
            </Container>
        </Box>
    );
};

export default CountdownSale;
