import {
    Box,
    Container,
    Typography,
    Accordion,
    AccordionSummary,
    AccordionDetails,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ScrollReveal from "../components/common/ScrollReveal";

const faqs = [
    {
        question: "HOW LONG DOES SHIPPING TAKE?",
        answer:
            "Orders are processed within 24-48 hours. For the dedicated, delivery usually takes 3-7 business days depending on your location. Every package is a step in the grind.",
    },
    {
        question: "DO YOU OFFER RETURNS OR EXCHANGES?",
        answer:
            "We stand by our craft. If it's not and-perfect, we offer 7-day easy returns and exchanges for unused items in original packaging. Quality is our manifesto.",
    },
    {
        question: "HOW CAN I TRACK MY ORDER?",
        answer:
            "Once shipped, you will receive a tracking link via email and SMS. Watch your arsenal as it moves closer to you.",
    },
    {
        question: "WHAT PAYMENT METHODS DO YOU ACCEPT?",
        answer:
            "We accept UPI, Debit/Credit Cards, Net Banking, and Cash on Delivery. Multiple paths, one objective.",
    },
    {
        question: "ARE YOUR PRODUCTS TRUE TO SIZE?",
        answer:
            "Our pieces are designed for a premium street fit. Please refer to the detailed size guide available on each product page to ensure your gear fits your grind.",
    },
];

const FAQ = () => {
    return (
        <Box sx={{ backgroundColor: "#fff", color: "#000" }}>
            {/* Header Section */}
            <Box sx={{ pt: 11, pb: 3, textAlign: "center", borderBottom: "1px solid rgba(0,0,0,0.1)" }}>
                <Container maxWidth="lg">
                    <ScrollReveal>
                        <Typography
                            variant="h1"
                            sx={{
                                fontWeight: 900,
                                fontSize: { xs: "3rem", md: "5rem", lg: "6rem" },
                                lineHeight: 1,
                                letterSpacing: -2,
                                textTransform: "uppercase",
                                mb: 2,
                            }}
                        >
                            THE <Box component="span" sx={{ color: "rgba(0,0,0,0.3)" }}>PROTOCOL</Box>
                        </Typography>
                        <Typography
                            variant="body1"
                            sx={{
                                fontSize: { xs: "0.9rem", md: "1.1rem" },
                                maxWidth: "600px",
                                margin: "0 auto",
                                opacity: 0.7,
                                letterSpacing: 1,
                                fontWeight: 300,
                            }}
                        >
                            CLEARING THE FOG. EVERYTHING YOU NEED TO KNOW ABOUT CARVING YOUR PATH WITH KAVR.
                        </Typography>
                    </ScrollReveal>
                </Container>
            </Box>

            {/* Accordion Section */}
            <Container maxWidth="md" sx={{ py: 5 }}>
                {faqs.map((faq, index) => (
                    <ScrollReveal key={index} delay={index * 0.1}>
                        <Accordion
                            sx={{
                                mb: 1,
                                backgroundColor: "transparent",
                                boxShadow: "none",
                                borderBottom: "1px solid rgba(0,0,0,0.1)",
                                borderRadius: "0 !important",
                                "&:before": { display: "none" },
                                "&.Mui-expanded": { mb: 2 },
                            }}
                        >
                            <AccordionSummary
                                expandIcon={<AddIcon sx={{ color: "#000" }} />}
                                sx={{
                                    px: 0,
                                    py: 2,
                                    minHeight: "40px",
                                    "&.Mui-expanded": {
                                        minHeight: "40px",
                                    },
                                    "& .MuiAccordionSummary-content": { my: 0 },
                                }}
                            >
                                <Typography
                                    sx={{
                                        fontWeight: 800,
                                        fontSize: { xs: "1rem", md: "1.25rem" },
                                    }}
                                >
                                    {faq.question}
                                </Typography>
                            </AccordionSummary>
                            <AccordionDetails sx={{ px: 0, pb: 2 }}>
                                <Typography
                                    sx={{
                                        color: "rgba(0,0,0,0.6)",
                                        fontSize: "1.1rem",
                                        lineHeight: 1.6,
                                        fontWeight: 400,
                                        maxWidth: "90%",
                                    }}
                                >
                                    {faq.answer}
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                    </ScrollReveal>
                ))}
            </Container>

            {/* Bottom Manifesto Hint */}
            {/* <Box sx={{ pb: 2, textAlign: "center" }}>
                <Container>
                    <Typography
                        variant="overline"
                        sx={{
                            letterSpacing: 8,
                            fontWeight: 700,
                            opacity: 0.3,
                        }}
                    >
                        CARVED BY THE GRIND
                    </Typography>
                </Container>
            </Box> */}
        </Box>
    );
};

export default FAQ;

