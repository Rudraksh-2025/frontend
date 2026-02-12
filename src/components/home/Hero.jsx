import { Box, Typography, Button } from "@mui/material";

const Hero = () => {
    return (
        <Box
            sx={{
                height: "90vh",
                width: "100%",
                position: "relative",
                backgroundImage:
                    "url('https://images.unsplash.com/photo-1520975922322-9f3b0cbb1b6b')",
                backgroundSize: "cover",
                backgroundPosition: "center",
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
