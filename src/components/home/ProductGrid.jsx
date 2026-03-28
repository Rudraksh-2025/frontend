import { useEffect, useState, useContext } from "react";
import { shopifyQuery } from "../../services/shopify";
import { CartContext } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";
import {
    Grid,
    Box,
    Typography,
    Button, Drawer,
    IconButton,
    Stack,
} from "@mui/material";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";

const ProductGrid = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));
    const [products, setProducts] = useState([]);
    const [hovered, setHovered] = useState(null);
    const [loading, setLoading] = useState(false);
    const [quickView, setQuickView] = useState(null);
    const [selectedVariant, setSelectedVariant] = useState(null);
    const { addToCart } = useContext(CartContext);

    const handleQuickView = (product) => {
        setQuickView(product);
        setSelectedVariant(product.variants.edges[0]?.node);
    };

    const handleClose = () => {
        setQuickView(null);
        setSelectedVariant(null);
    };

    const navigate = useNavigate();

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        const query = `
      {
        products(first:50){
          edges{
            node{
              id
              title
              handle
              images(first:2){
                edges{
                  node{ url }
                }
              }
             variants(first:10){
  edges{
    node{
      id
      title
      availableForSale
      quantityAvailable
      price{ amount }
      compareAtPrice{ amount }
    }
  }
}
            }
          }
        }
      }
    `;

        const data = await shopifyQuery(query);
        setProducts(data.products.edges);
    };

    const calculateDiscount = (price, compare) => {
        if (!compare) return null;
        const discount =
            ((compare - price) / compare) * 100;
        return Math.round(discount);
    };


    return (

        <Box sx={{ px: { xs: 1, md: 4 }, py: 6 }}>
            <Typography
                variant="h3"
                sx={{
                    textAlign: "center",
                    fontWeight: 900,
                    fontSize: { xs: "2rem", md: "3.5rem" },
                    letterSpacing: -1,
                    textTransform: "uppercase",
                    mb: 6,
                }}
            >
                THE <Box component="span" sx={{ color: "rgba(0,0,0,0.3)" }}>COLLECTION</Box>
            </Typography>

            <Grid container spacing={{ xs: 2, md: 4 }}>
                {products.map(({ node }) => {
                    const variant = node.variants.edges[0]?.node;
                    const price = parseFloat(variant.price.amount);
                    const compare = variant.compareAtPrice
                        ? parseFloat(variant.compareAtPrice.amount)
                        : null;
                    const discount = calculateDiscount(price, compare);
                    const images = node.images.edges;
                    const primary = images[0]?.node.url;
                    const secondary = images[1]?.node.url || primary;

                    return (
                        <Grid size={{ xs: 6, sm: 6, md: 4, lg: 3 }} key={node.id}>
                            <Box
                                sx={{
                                    cursor: "pointer",
                                    textAlign: "center",
                                    position: "relative",
                                }}
                                onClick={() =>
                                    navigate(`/product/${node.handle}`)
                                }
                            >
                                {isMobile && (
                                    <Box
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleQuickView(node);
                                        }}
                                        sx={{
                                            position: "absolute",
                                            top: 10,
                                            right: 10,
                                            width: 40,
                                            height: 40,
                                            borderRadius: "50%",
                                            bgcolor: "rgba(0,0,0,0.7)",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            color: "#fff",
                                            zIndex: 5,
                                        }}
                                    >
                                        <VisibilityOutlinedIcon fontSize="small" />
                                    </Box>
                                )}
                                {/* Discount Badge */}
                                {discount && (
                                    <Box
                                        sx={{
                                            position: "absolute",
                                            top: 10,
                                            left: 10,
                                            background: "#b00020",
                                            color: "#fff",
                                            px: 1.5,
                                            py: 0.5,
                                            fontSize: 12,
                                            letterSpacing: 1,
                                        }}
                                    >
                                        SAVE {discount}%
                                    </Box>
                                )}

                                {/* Image */}
                                <Box
                                    component="img"
                                    src={hovered === node.id ? secondary : primary}
                                    onMouseEnter={() => setHovered(node.id)}
                                    onMouseLeave={() => setHovered(null)}
                                    sx={{
                                        width: "100%",
                                        height: 300,
                                        objectFit: "contain",
                                        transition: "0.3s",
                                    }}
                                />

                                {/* Title */}
                                <Typography
                                    sx={{
                                        mt: { xs: 0, md: 2 },
                                        letterSpacing: 2,
                                        fontSize: 14,
                                    }}
                                >
                                    {node.title.toUpperCase()}
                                </Typography>

                                {/* Price Section */}
                                <Box sx={{ mt: 1 }}>
                                    <Typography
                                        sx={{
                                            color: "red",
                                            fontWeight: 600,
                                            display: "inline",
                                            mr: 1,
                                        }}
                                    >
                                        ₹{price.toFixed(2)}
                                    </Typography>

                                    {compare && (
                                        <Typography
                                            sx={{
                                                textDecoration: "line-through",
                                                color: "#888",
                                                display: "inline",
                                            }}
                                        >
                                            ₹{compare.toFixed(2)}
                                        </Typography>
                                    )}
                                </Box>

                                {/* Add to Cart Button */}
                                {/* <Button
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 2 }}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        addToCart(variant.id);
                                    }}
                                >
                                    Add to Cart
                                </Button> */}
                            </Box>
                        </Grid>
                    );
                })}
            </Grid>

            <Drawer
                anchor="bottom"
                open={!!quickView}
                onClose={handleClose}
                PaperProps={{
                    sx: {
                        borderTopLeftRadius: 20,
                        borderTopRightRadius: 20,
                        p: 2,
                        maxHeight: "90vh",
                    },
                }}
            >
                {quickView && (
                    <Box>
                        {/* Close */}
                        <IconButton
                            onClick={handleClose}
                            sx={{ position: "absolute", right: 10, top: 10 }}
                        >
                            <CloseIcon />
                        </IconButton>

                        {/* Image */}
                        <Box
                            component="img"
                            src={quickView.images.edges[0]?.node.url}
                            sx={{
                                width: "100%",
                                height: 250,
                                objectFit: "contain",
                            }}
                        />

                        {/* Title */}
                        <Typography sx={{ mt: 2, fontWeight: 700 }}>
                            {quickView.title}
                        </Typography>

                        {/* Price */}
                        <Typography sx={{ mt: 1, fontWeight: 600 }}>
                            ₹
                            {quickView.variants.edges[0].node.price.amount}
                        </Typography>

                        {/* Sizes*/}
                        <Box sx={{ mt: 3 }}>
                            <Typography sx={{ mb: 1, fontWeight: 500 }}>
                                Size:
                            </Typography>

                            <Stack direction="row" spacing={1} flexWrap="wrap">
                                {quickView.variants.edges.map(({ node }) => {
                                    const isOutOfStock =
                                        !node.availableForSale || node.quantityAvailable === 0;

                                    const isSelected = selectedVariant?.id === node.id;

                                    return (
                                        <Button
                                            key={node.id}
                                            variant="outlined"
                                            disabled={isOutOfStock}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                if (!isOutOfStock) setSelectedVariant(node);
                                            }}
                                            sx={{
                                                minWidth: 55,
                                                borderColor: isSelected ? "#000" : "#ccc",
                                                backgroundColor: isSelected ? "#000" : "#fff",
                                                color: isSelected ? "#fff" : "#000",
                                                position: "relative",
                                                opacity: isOutOfStock ? 0.5 : 1,
                                            }}
                                        >
                                            {node.title}

                                            {isOutOfStock && (
                                                <Box
                                                    sx={{
                                                        position: "absolute",
                                                        width: "100%",
                                                        height: "2px",
                                                        background: "#000",
                                                        transform: "rotate(-20deg)",
                                                    }}
                                                />
                                            )}
                                        </Button>
                                    );
                                })}
                            </Stack>
                        </Box>

                        {/* Add to Cart */}
                        <Button
                            disabled={!selectedVariant || loading}
                            fullWidth
                            variant="contained"
                            sx={{
                                mt: 3,
                                py: 2,
                                borderRadius: "30px",
                                bgcolor: "#000",
                            }}
                            onClick={async () => {
                                setLoading(true);
                                await addToCart(selectedVariant.id);
                                setLoading(false);
                                handleClose();
                            }}
                        >
                            {loading ? "Adding..." : "Add to cart"}
                        </Button>
                    </Box>
                )}
            </Drawer>
        </Box>

    );
};

export default ProductGrid;
