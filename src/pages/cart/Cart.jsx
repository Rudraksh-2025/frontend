import {
    Container,
    Typography,
    Box,
    Button,
    Paper,
} from "@mui/material";
import { useContext } from "react";
import { CartContext } from "../../context/CartContext";

const Cart = () => {
    const { cart } = useContext(CartContext);

    if (!cart)
        return (
            <Container sx={{ mt: 6 }}>
                <Typography>Your cart is empty</Typography>
            </Container>
        );

    return (
        <Container sx={{ mt: 6 }}>
            <Typography variant="h5" gutterBottom>
                Your Cart ({cart.totalQuantity})
            </Typography>

            <Paper sx={{ p: 3 }}>
                <Button
                    variant="contained"
                    fullWidth
                    size="large"
                    onClick={() =>
                        (window.location.href = cart.checkoutUrl)
                    }
                >
                    Proceed to Checkout
                </Button>
            </Paper>
        </Container>
    );
};

export default Cart;
