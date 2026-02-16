import {
    Container,
    Paper,
    Typography,
    TextField,
    Button,
    Alert,
    CircularProgress,
    Box,
} from "@mui/material";
import { Formik } from "formik";
import * as Yup from "yup";
import { shopifyQuery } from "../../services/shopify";

const ContactSchema = Yup.object().shape({
    firstName: Yup.string().required("First name required"),
    lastName: Yup.string(),
    email: Yup.string().email("Invalid email").required("Email required"),
    message: Yup.string().required("Message required"),
});

const Contact = () => {
    return (
        <Container maxWidth="sm" sx={{ mt: 10, mb: 10 }}>
            <Paper elevation={4} sx={{ p: 5, borderRadius: 3 }}>
                <Typography variant="h4" fontWeight={600} mb={3}>
                    Contact Us
                </Typography>

                <Formik
                    initialValues={{
                        firstName: "",
                        lastName: "",
                        email: "",
                        message: "",
                    }}
                    validationSchema={ContactSchema}
                    onSubmit={async (values, { setSubmitting, setStatus, resetForm }) => {
                        try {
                            const mutation = `
                mutation contactCreate($input: ContactInput!) {
                  contactCreate(input: $input) {
                    userErrors {
                      field
                      message
                    }
                  }
                }
              `;

                            const response = await shopifyQuery(mutation, {
                                input: {
                                    firstName: values.firstName,
                                    lastName: values.lastName,
                                    email: values.email,
                                    body: values.message,
                                },
                            });

                            const errors =
                                response.contactCreate.userErrors;

                            if (errors.length > 0) {
                                setStatus(errors[0].message);
                                return;
                            }

                            setStatus("success");
                            resetForm();
                        } catch (error) {
                            setStatus("Something went wrong. Try again.");
                        } finally {
                            setSubmitting(false);
                        }
                    }}
                >
                    {({
                        values,
                        errors,
                        touched,
                        handleChange,
                        handleSubmit,
                        isSubmitting,
                        status,
                    }) => (
                        <Box component="form" onSubmit={handleSubmit}>
                            {status && status !== "success" && (
                                <Alert severity="error" sx={{ mb: 2 }}>
                                    {status}
                                </Alert>
                            )}

                            {status === "success" && (
                                <Alert severity="success" sx={{ mb: 2 }}>
                                    Your message has been sent successfully!
                                </Alert>
                            )}

                            <TextField
                                fullWidth
                                label="First Name"
                                name="firstName"
                                margin="normal"
                                value={values.firstName}
                                onChange={handleChange}
                                error={touched.firstName && Boolean(errors.firstName)}
                                helperText={touched.firstName && errors.firstName}
                            />

                            <TextField
                                fullWidth
                                label="Last Name"
                                name="lastName"
                                margin="normal"
                                value={values.lastName}
                                onChange={handleChange}
                            />

                            <TextField
                                fullWidth
                                label="Email"
                                name="email"
                                margin="normal"
                                value={values.email}
                                onChange={handleChange}
                                error={touched.email && Boolean(errors.email)}
                                helperText={touched.email && errors.email}
                            />

                            <TextField
                                fullWidth
                                label="Message"
                                name="message"
                                margin="normal"
                                multiline
                                rows={4}
                                value={values.message}
                                onChange={handleChange}
                                error={touched.message && Boolean(errors.message)}
                                helperText={touched.message && errors.message}
                            />

                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                size="large"
                                sx={{ mt: 3, py: 1.5 }}
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? (
                                    <CircularProgress size={22} />
                                ) : (
                                    "Send Message"
                                )}
                            </Button>
                        </Box>
                    )}
                </Formik>
            </Paper>
        </Container>
    );
};

export default Contact;
