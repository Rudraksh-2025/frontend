import {
    Container,
    Typography,
    Box,
    Button,
    Paper,
    Divider,
    Grid,
    IconButton,
} from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useContext } from "react";
import { CartContext } from "../../context/CartContext";

const Cart = () => {
    const { cart, updateQuantity, removeItem } = useContext(CartContext);
    console.log(cart)

    if (!cart || cart?.lines?.length === 0)
        return (
            <Container sx={{ mt: 10, textAlign: "center" }}>
                <Typography variant="h5" gutterBottom>
                    Your cart is empty
                </Typography>
                <Button variant="contained" href="/">
                    Continue Shopping
                </Button>
            </Container>
        );

    return (
        <Container sx={{ mt: 8, mb: 8 }}>
            <Typography variant="h4" fontWeight={600} gutterBottom>
                Your Cart ({cart?.totalQuantity})
            </Typography>

            <Grid container spacing={4}>
                {/* LEFT SIDE - PRODUCTS */}
                <Grid size={{ xs: 12, md: 8 }}>
                    <Paper sx={{ p: 3, borderRadius: 3 }}>
                        {cart?.lines?.map((item, index) => (
                            <Box key={item?.id}>
                                <Grid container spacing={2} alignItems="center">
                                    {/* Product Image */}
                                    <Grid size={{ xs: 4, sm: 3 }}>
                                        <Box
                                            component="img"
                                            src={item?.merchandise?.image?.url}
                                            alt={item?.merchandise?.product?.title}
                                            sx={{
                                                width: "100%",
                                                borderRadius: 2,
                                            }}
                                        />
                                    </Grid>

                                    {/* Product Info */}
                                    <Grid size={{ xs: 8, sm: 9 }}>
                                        <Typography fontWeight={600}>
                                            {item?.merchandise?.product?.title}
                                        </Typography>

                                        <Typography
                                            variant="body2"
                                            color="text.secondary"
                                            sx={{ mb: 1 }}
                                        >
                                            {item?.merchandise?.title}
                                        </Typography>

                                        {/* Quantity Controls */}
                                        <Box
                                            sx={{
                                                display: "flex",
                                                alignItems: "center",
                                                gap: 2,
                                                mt: 1,
                                            }}
                                        >
                                            <Button
                                                size="small"
                                                variant="outlined"
                                                onClick={() =>
                                                    updateQuantity(item?.id, item?.quantity
                                                        - 1)
                                                }
                                            >
                                                -
                                            </Button>

                                            <Typography>{item?.quantity}</Typography>

                                            <Button
                                                size="small"
                                                variant="outlined"
                                                onClick={() =>
                                                    updateQuantity(item?.id, item?.quantity + 1)
                                                }
                                            >
                                                +
                                            </Button>

                                            <Typography sx={{ ml: "auto", fontWeight: 600 }}>
                                                ₹{item?.cost?.totalAmount?.amount}
                                            </Typography>
                                        </Box>

                                        {/* Remove */}
                                        <IconButton
                                            onClick={() => removeItem(item?.id)}
                                            sx={{ mt: 1 }}
                                        >
                                            <DeleteOutlineIcon fontSize="small" />
                                        </IconButton>
                                    </Grid>
                                </Grid>

                                {index !== cart?.lines?.length - 1 && (
                                    <Divider sx={{ my: 3 }} />
                                )}
                            </Box>
                        ))}
                    </Paper>
                </Grid>

                {/* RIGHT SIDE - SUMMARY */}
                <Grid size={{ xs: 12, md: 4 }}>
                    <Paper
                        sx={{
                            p: 3,
                            borderRadius: 3,
                            position: "sticky",
                            top: 100,
                        }}
                    >
                        <Typography variant="h6" gutterBottom>
                            Order Summary
                        </Typography>

                        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                            <Typography>Subtotal</Typography>
                            <Typography fontWeight={600}>
                                ₹{cart.cost.subtotalAmount.amount}
                            </Typography>
                        </Box>

                        <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ mb: 2 }}
                        >
                            Shipping & taxes calculated at checkout.
                        </Typography>

                        <Button
                            variant="contained"
                            fullWidth
                            size="large"
                            sx={{
                                mt: 2,
                                py: 1.5,
                                fontWeight: 600,
                                borderRadius: 2,
                            }}
                            onClick={() =>
                                (window.location.href = cart.checkoutUrl)
                            }
                        >
                            Proceed to Checkout
                        </Button>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Cart;
