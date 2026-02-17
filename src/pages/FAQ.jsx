import {
    Box,
    Container,
    Typography,
    Accordion,
    AccordionSummary,
    AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const faqs = [
    {
        question: "How long does shipping take?",
        answer:
            "Orders are processed within 24-48 hours. Delivery usually takes 3-7 business days depending on your location.",
    },
    {
        question: "Do you offer returns or exchanges?",
        answer:
            "Yes, we offer 7-day easy returns and exchanges for unused items in original packaging.",
    },
    {
        question: "How can I track my order?",
        answer:
            "Once shipped, you will receive a tracking link via email and SMS.",
    },
    {
        question: "What payment methods do you accept?",
        answer:
            "We accept UPI, Debit/Credit Cards, Net Banking, and Cash on Delivery.",
    },
    {
        question: "Are your products true to size?",
        answer:
            "Yes. Please refer to the size guide available on each product page before ordering.",
    },
];

const FAQ = () => {
    return (
        <Container maxWidth="md" sx={{ pt: 10, pb: 5 }}>
            <Typography variant="h4" fontWeight={600} gutterBottom>
                Frequently Asked Questions
            </Typography>

            <Typography color="text.secondary" sx={{ mb: 4 }}>
                Find answers to the most common questions about KEVR.
            </Typography>

            {faqs.map((faq, index) => (
                <Accordion key={index} sx={{ mb: 2, borderRadius: 2 }}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography fontWeight={500}>
                            {faq.question}
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography color="text.secondary">
                            {faq.answer}
                        </Typography>
                    </AccordionDetails>
                </Accordion>
            ))}
        </Container>
    );
};

export default FAQ;
