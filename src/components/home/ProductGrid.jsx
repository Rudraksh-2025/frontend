import { useEffect, useState, useContext } from "react";
import { shopifyQuery } from "../../services/shopify";
import { CartContext } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";
import {
    Grid,
    Box,
    Typography,
    Button,
} from "@mui/material";

const ProductGrid = () => {
    const [products, setProducts] = useState([]);
    const { addToCart } = useContext(CartContext);
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
              images(first:1){
                edges{
                  node{ url }
                }
              }
              variants(first:1){
                edges{
                  node{
                    id
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
        <Box sx={{ px: 8, py: 6 }}>
            <Typography
                variant="h4"
                sx={{
                    textAlign: "center",
                    letterSpacing: 6,
                    mb: 6,
                }}
            >
                NEW ARRIVALS
            </Typography>

            <Grid container spacing={6}>
                {products.map(({ node }) => {
                    const variant = node.variants.edges[0]?.node;
                    const price = parseFloat(variant.price.amount);
                    const compare = variant.compareAtPrice
                        ? parseFloat(variant.compareAtPrice.amount)
                        : null;
                    const discount = calculateDiscount(price, compare);

                    return (
                        <Grid size={{ xs: 12, sm: 6, md: 3 }} key={node.id}>
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
                                    src={node.images.edges[0]?.node.url}
                                    sx={{
                                        width: "100%",
                                        height: 200,
                                        objectFit: "contain",
                                        transition: "0.3s",
                                        "&:hover": {
                                            transform: "scale(1.05)",
                                        },
                                    }}
                                />

                                {/* Title */}
                                <Typography
                                    sx={{
                                        mt: 3,
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
                                <Button
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 2 }}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        addToCart(variant.id);
                                    }}
                                >
                                    Add to Cart
                                </Button>
                            </Box>
                        </Grid>
                    );
                })}
            </Grid>
        </Box>
    );
};

export default ProductGrid;
