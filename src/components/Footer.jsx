import {
    Box,
    Container,
    Grid,
    Typography,
    TextField,
    Button,
    IconButton,
    Divider,
} from "@mui/material";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import { useNavigate } from "react-router-dom";

const Footer = () => {
    const navigate = useNavigate();

    return (
        <Box
            data-cursor-color="white"
            sx={{
                backgroundColor: "#000",
                color: "#fff",
                // mt: 10,
                pt: 8,
                pb: 4,
            }}
        >
            <Container maxWidth="lg">
                <Grid container spacing={6}>
                    {/* BRAND */}
                    <Grid size={{ xs: 12, md: 7 }}>
                        <Typography
                            variant="h5"
                            sx={{ fontWeight: 700, letterSpacing: 2 }}
                        >
                            KAVR
                        </Typography>

                        <Typography
                            sx={{
                                mt: 2,
                                color: "#aaa",
                                lineHeight: 1.7,
                            }}
                        >
                            Premium streetwear essentials designed for bold expression.
                            Crafted with quality fabrics and timeless aesthetics.
                        </Typography>

                        {/* Social Icons */}
                        <Box sx={{ mt: 3 }}>
                            <Button
                                variant="contained"
                                startIcon={<InstagramIcon />}
                                sx={{
                                    mt: 3,
                                    textTransform: "none",
                                    fontWeight: 600,
                                    borderRadius: "30px",
                                    px: 3,
                                    background: "linear-gradient(45deg, #f58529, #dd2a7b, #8134af, #515bd4)",
                                    color: "#fff",
                                    "&:hover": {
                                        opacity: 0.9,
                                    },
                                }}
                            >
                                @kavr
                            </Button>

                        </Box>
                    </Grid>
                    {/* <Grid size={{ xs: 0, md: 1 }}>
                    </Grid> */}

                    {/* SHOP */}
                    <Grid size={{ xs: 6, md: 2 }}>
                        <Typography sx={{ mb: 2, fontWeight: 600 }}>
                            SHOP
                        </Typography>

                        {/* <Typography
                            sx={{ mb: 1, cursor: "pointer", color: "#aaa" }}
                            onClick={() => navigate("/")}
                        >
                            New Arrivals
                        </Typography> */}

                        <Typography sx={{ mb: 1, color: "#aaa" }}>
                            Bottoms
                        </Typography>
                    </Grid>

                    {/* SUPPORT */}
                    <Grid size={{ xs: 6, md: 2 }}>
                        <Typography sx={{ mb: 2, fontWeight: 600 }}>
                            SUPPORT
                        </Typography>

                        <Typography sx={{ mb: 1, color: "#aaa", cursor: 'pointer' }} onClick={() => navigate("/contact")}>
                            Contact Us
                        </Typography>

                        <Typography sx={{ mb: 1, color: "#aaa", cursor: 'pointer' }} onClick={() => navigate("/policy")}>
                            Shipping & Returns
                        </Typography>

                        <Typography sx={{ mb: 1, color: "#aaa", cursor: 'pointer' }} onClick={() => navigate("/faq")}>
                            FAQs
                        </Typography>
                        {/* 
                        <Typography sx={{ mb: 1, color: "#aaa" }}>
                            Track Order
                        </Typography> */}
                    </Grid>

                    {/* NEWSLETTER */}
                    {/* <Grid size={{ xs: 12, md: 4 }}>
                        <Typography sx={{ mb: 2, fontWeight: 600 }}>
                            JOIN OUR NEWSLETTER
                        </Typography>

                        <Typography sx={{ mb: 2, color: "#aaa" }}>
                            Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals.
                        </Typography>

                        <Box sx={{ display: "flex", gap: 1 }}>
                            <TextField
                                variant="outlined"
                                placeholder="Enter your email"
                                size="small"
                                sx={{
                                    backgroundColor: "#111",
                                    input: { color: "#fff" },
                                    flex: 1,
                                }}
                            />
                            <Button
                                variant="contained"
                                sx={{
                                    backgroundColor: "#fff",
                                    color: "#000",
                                    "&:hover": {
                                        backgroundColor: "#ddd",
                                    },
                                }}
                            >
                                Subscribe
                            </Button>
                        </Box>
                    </Grid> */}
                </Grid>

                <Divider sx={{ backgroundColor: "#222", my: 6 }} />

                {/* Bottom */}
                <Typography
                    align="center"
                    sx={{ color: "#777", fontSize: 14 }}
                >
                    © {new Date().getFullYear()} KAVR. All rights reserved.
                </Typography>
            </Container>
        </Box>
    );
};

export default Footer;
// window.sliderImages?.slice(0, 6).map(img => ({ image: img }));