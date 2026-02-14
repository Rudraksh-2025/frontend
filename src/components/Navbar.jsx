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
import { useContext, useEffect, useState } from "react";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";
import { useLocation } from "react-router-dom";


const Navbar = () => {
    const navigate = useNavigate();
    const { cart } = useContext(CartContext);
    const { customer, logout } = useContext(AuthContext);
    const location = useLocation();


    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 80);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const isHomeTop = location.pathname === "/" && !scrolled;



    return (
        <AppBar
            position="fixed"
            elevation={0}
            sx={{
                backdropFilter: scrolled ? "blur(8px)" : "none",
                backgroundColor: scrolled ? "#fff" : "transparent",
                color: isHomeTop ? "#fff" : "#000",
                transition: "all 0.3s ease",
            }}
        >
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
                        <Button
                            onClick={logout}
                            sx={{ color: "inherit" }}
                        >
                            Logout
                        </Button>
                    ) : (
                        <>
                            <Button
                                onClick={() => navigate("/login")}
                                sx={{ color: "inherit" }}
                            >
                                Login
                            </Button>
                            <Button
                                onClick={() => navigate("/register")}
                                sx={{ color: "inherit" }}
                            >
                                Register
                            </Button>
                        </>
                    )}

                    <IconButton
                        onClick={() => navigate("/cart")}
                        sx={{ color: "inherit" }}
                    >
                        <Badge
                            badgeContent={cart?.totalQuantity || 0}
                            color="secondary"
                        >
                            <ShoppingCartIcon />
                        </Badge>
                    </IconButton>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
