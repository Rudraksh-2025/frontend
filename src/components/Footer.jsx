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
            sx={{
                backgroundColor: "#000",
                color: "#fff",
                mt: 10,
                pt: 8,
                pb: 4,
            }}
        >
            <Container maxWidth="lg">
                <Grid container spacing={6}>
                    {/* BRAND */}
                    <Grid size={{ xs: 12, md: 4 }}>
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
                            <IconButton sx={{ color: "#fff" }}>
                                <InstagramIcon />
                            </IconButton>
                            <IconButton sx={{ color: "#fff" }}>
                                <FacebookIcon />
                            </IconButton>
                            <IconButton sx={{ color: "#fff" }}>
                                <TwitterIcon />
                            </IconButton>
                        </Box>
                    </Grid>

                    {/* SHOP */}
                    <Grid size={{ xs: 6, md: 2 }}>
                        <Typography sx={{ mb: 2, fontWeight: 600 }}>
                            SHOP
                        </Typography>

                        <Typography
                            sx={{ mb: 1, cursor: "pointer", color: "#aaa" }}
                            onClick={() => navigate("/")}
                        >
                            New Arrivals
                        </Typography>

                        <Typography sx={{ mb: 1, color: "#aaa" }}>
                            Tops
                        </Typography>

                        <Typography sx={{ mb: 1, color: "#aaa" }}>
                            Bottoms
                        </Typography>

                        <Typography sx={{ mb: 1, color: "#aaa" }}>
                            Clearance
                        </Typography>
                    </Grid>

                    {/* SUPPORT */}
                    <Grid size={{ xs: 6, md: 2 }}>
                        <Typography sx={{ mb: 2, fontWeight: 600 }}>
                            SUPPORT
                        </Typography>

                        <Typography sx={{ mb: 1, color: "#aaa" }}>
                            Contact Us
                        </Typography>

                        <Typography sx={{ mb: 1, color: "#aaa" }}>
                            Shipping & Returns
                        </Typography>

                        <Typography sx={{ mb: 1, color: "#aaa" }}>
                            FAQs
                        </Typography>

                        <Typography sx={{ mb: 1, color: "#aaa" }}>
                            Track Order
                        </Typography>
                    </Grid>

                    {/* NEWSLETTER */}
                    <Grid size={{ xs: 12, md: 4 }}>
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
                    </Grid>
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
