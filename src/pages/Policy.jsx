import { Container, Typography, Box, Divider } from "@mui/material";

const Policy = () => {
    return (
        <Container maxWidth="md" sx={{ py: 10 }}>
            <Typography variant="h3" fontWeight={600} gutterBottom>
                Terms & Policies
            </Typography>

            <Typography color="text.secondary" sx={{ mb: 4 }}>
                Please read our policies carefully before placing an order with KEVR.
            </Typography>

            {/* Privacy Policy */}
            <Section
                title="Privacy Policy"
                content={[
                    "We collect personal information such as name, email, phone number, and address for order processing and customer service.",
                    "Your data is never sold or shared with third parties.",
                    "Payment information is securely processed through trusted payment gateways.",
                ]}
            />

            {/* Terms of Service */}
            <Section
                title="Terms of Service"
                content={[
                    "By using this website, you agree to comply with our policies and terms.",
                    "All product prices are subject to change without notice.",
                    "KEVR reserves the right to cancel orders due to pricing errors or stock issues.",
                ]}
            />

            {/* Shipping Policy */}
            <Section
                title="Shipping Policy"
                content={[
                    "Orders are processed within 24-48 business hours.",
                    "Delivery time is typically 3-7 business days across India.",
                    "Shipping charges (if applicable) are displayed at checkout.",
                    "Free shipping may be available on orders above a certain value.",
                ]}
            />

            {/* Returns & Refund Policy */}
            <Section
                title="Returns & Refund Policy"
                content={[
                    "Returns are accepted within 7 days of delivery.",
                    "Items must be unused, unwashed, and in original packaging.",
                    "Refunds are processed within 5-7 business days after inspection.",
                    "Shipping charges are non-refundable unless the item is defective.",
                ]}
            />

            {/* Cancellation Policy */}
            <Section
                title="Cancellation Policy"
                content={[
                    "Orders can be cancelled before they are shipped.",
                    "Once shipped, cancellation is not possible.",
                    "For urgent cancellation requests, contact customer support immediately.",
                ]}
            />
        </Container>
    );
};

const Section = ({ title, content }) => (
    <Box sx={{ mt: 6 }}>
        <Typography variant="h5" fontWeight={600} gutterBottom>
            {title}
        </Typography>

        {content.map((text, index) => (
            <Typography
                key={index}
                paragraph
                color="text.secondary"
            >
                • {text}
            </Typography>
        ))}

        <Divider sx={{ mt: 3 }} />
    </Box>
);

export default Policy;
