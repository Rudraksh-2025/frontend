import { Box, Typography, Button } from "@mui/material";

// backgroundImage: `url(${window.sliderImages?.[0]})`


const Hero = () => {
    return (
        <Box
            sx={{
                height: "100vh",
                width: "100%",
                position: "relative",
                backgroundImage:
                    "url('./trackslider1.png')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundAttachment: "fixed", // 🔥 PARALLAX
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            {/* Dark Overlay */}
            <Box
                sx={{
                    position: "absolute",
                    inset: 0,
                    background:
                        "linear-gradient(to right, rgba(0,0,0,0.8), rgba(0,0,0,0.3))",
                }}
            />

            {/* Content */}
            <Box sx={{ position: "relative", textAlign: "center" }}>
                <Typography
                    variant="h6"
                    sx={{
                        color: "#fff",
                        letterSpacing: 4,
                        fontWeight: 400,
                    }}
                >
                    NEW ARRIVALS
                </Typography>

                <Typography
                    variant="h2"
                    sx={{
                        color: "#fff",
                        fontWeight: 700,
                        mt: 2,
                    }}
                >
                    STREET ESSENTIALS
                </Typography>

                <Button
                    variant="outlined"
                    sx={{
                        mt: 4,
                        borderColor: "#fff",
                        color: "#fff",
                        px: 4,
                        "&:hover": {
                            backgroundColor: "#fff",
                            color: "#000",
                        },
                    }}
                >
                    SHOP NOW
                </Button>
            </Box>
        </Box>
    );
};

export default Hero;
