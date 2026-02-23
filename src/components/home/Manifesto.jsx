import { Box, Typography, Container, Grid } from "@mui/material";

const Manifesto = () => {
    return (
        <Box sx={{ py: { xs: 5, md: 6 }, backgroundColor: "#fff", color: "#000" }}>
            <Container maxWidth="xl">
                <Grid container spacing={3} alignItems="center">
                    <Grid size={{ xs: 12, md: 6 }}>
                        <Typography
                            variant="h2"
                            sx={{
                                fontWeight: 900,
                                fontSize: { xs: "2.5rem", md: "4rem" },
                                lineHeight: 1,
                                letterSpacing: -1,
                                textTransform: "uppercase",
                                mb: 1,
                            }}
                        >
                            THE PHILOSOPHY <br />
                            <Box component="span" sx={{ color: "rgba(0,0,0,0.3)" }}>
                                OF THE GRIND.
                            </Box>
                        </Typography>
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <Typography
                            variant="body1"
                            sx={{
                                fontSize: { xs: "1.1rem", md: "1.2rem" },
                                fontWeight: 400,
                                lineHeight: 1.6,
                                mb: 2,
                            }}
                        >
                            KAVR was born from the realization that greatness is not given, it's carved. It's the sweat in the early hours, the persistence when the world is asleep, and the relentless pursuit of more.
                        </Typography>
                        <Typography
                            variant="body1"
                            sx={{
                                fontSize: { xs: "1.1rem", md: "1.2rem" },
                                fontWeight: 400,
                                lineHeight: 1.6,
                                color: "rgba(0,0,0,0.6)",
                            }}
                        >
                            Our trackpants are more than just fabric and thread. They are the uniform of the dedicated. Engineered for performance, designed for the streets, and built to survive the grind.
                        </Typography>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default Manifesto;
