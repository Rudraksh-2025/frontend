import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    Box,
    IconButton,
    Badge,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
    const navigate = useNavigate();
    const { cart } = useContext(CartContext);
    const { customer, logout } = useContext(AuthContext);

    return (
        <AppBar position="sticky" elevation={0} color="transparent">
            <Toolbar sx={{ justifyContent: "space-between" }}>
                <Typography
                    variant="h6"
                    sx={{ cursor: "pointer", fontWeight: 700 }}
                    onClick={() => navigate("/")}
                >
                    KAVR
                </Typography>

                <Box>
                    {customer ? (
                        <>
                            <Button onClick={logout}>Logout</Button>
                        </>
                    ) : (
                        <>
                            <Button onClick={() => navigate("/login")}>
                                Login
                            </Button>
                            <Button onClick={() => navigate("/register")}>
                                Register
                            </Button>
                        </>
                    )}

                    <IconButton onClick={() => navigate("/cart")}>
                        <Badge badgeContent={cart?.totalQuantity || 0} color="secondary">
                            <ShoppingCartIcon />
                        </Badge>
                    </IconButton>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
