import {
    Box,
    Typography,
    Button,
    Grid,
    Chip,
    Rating,
    Stack,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { shopifyQuery } from "../../services/shopify";
import { CartContext } from "../../context/CartContext";

const ProductDetails = () => {
    const { handle } = useParams();
    const { addToCart } = useContext(CartContext);

    const [product, setProduct] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const [selectedVariant, setSelectedVariant] = useState(null);
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        fetchProduct();
    }, [handle]);

    const fetchProduct = async () => {
        const query = `
      query getProduct($handle: String!) {
        product(handle: $handle) {
          id
          title
          description
          images(first: 10) {
            edges {
              node { url }
            }
          }
          variants(first: 10) {
            edges {
              node {
                id
                title
                price { amount }
                compareAtPrice { amount }
              }
            }
          }
        }
      }
    `;

        const data = await shopifyQuery(query, { handle });
        const prod = data.product;

        setProduct(prod);
        setSelectedImage(prod.images.edges[0]?.node.url);
        setSelectedVariant(prod.variants.edges[0]?.node);
    };

    if (!product) return null;

    return (
        <Box sx={{ px: 8, py: 6 }}>
            <Grid container spacing={6}>
                {/* LEFT SIDE - IMAGES */}
                <Grid size={{ xs: 12, md: 6 }}>
                    <Grid container spacing={2}>
                        {/* Thumbnails */}
                        <Grid size={2}>
                            <Stack spacing={2}>
                                {product.images.edges.map((img, i) => (
                                    <Box
                                        key={i}
                                        component="img"
                                        src={img.node.url}
                                        sx={{
                                            width: "100%",
                                            cursor: "pointer",
                                            border:
                                                selectedImage === img.node.url
                                                    ? "2px solid black"
                                                    : "1px solid #ddd",
                                        }}
                                        onClick={() =>
                                            setSelectedImage(img.node.url)
                                        }
                                    />
                                ))}
                            </Stack>
                        </Grid>

                        {/* Main Image */}
                        <Grid size={10}>
                            <Box
                                component="img"
                                src={selectedImage}
                                sx={{
                                    width: "100%",
                                    objectFit: "contain",
                                }}
                            />
                        </Grid>
                    </Grid>
                </Grid>

                {/* RIGHT SIDE - DETAILS */}
                <Grid size={{ xs: 12, md: 6 }}>
                    <Typography variant="h4" sx={{ mb: 2 }}>
                        {product.title}
                    </Typography>

                    <Rating value={5} readOnly size="small" />

                    {/* Save Badge */}
                    <Chip
                        label="SAVE 37%"
                        color="error"
                        size="small"
                        sx={{ mt: 2 }}
                    />

                    {/* Price */}
                    <Box sx={{ mt: 2 }}>
                        <Typography
                            variant="h5"
                            sx={{ color: "red", fontWeight: 600 }}
                        >
                            ₹{selectedVariant.price.amount}
                        </Typography>

                        {selectedVariant.compareAtPrice && (
                            <Typography
                                sx={{
                                    textDecoration: "line-through",
                                    color: "#888",
                                }}
                            >
                                ₹{selectedVariant.compareAtPrice.amount}
                            </Typography>
                        )}
                    </Box>

                    {/* Size Selector */}
                    <Box sx={{ mt: 4 }}>
                        <Typography sx={{ mb: 1 }}>
                            Size:
                        </Typography>

                        <Stack direction="row" spacing={2}>
                            {product.variants.edges.map(({ node }) => (
                                <Button
                                    key={node.id}
                                    variant={
                                        selectedVariant.id === node.id
                                            ? "contained"
                                            : "outlined"
                                    }
                                    onClick={() =>
                                        setSelectedVariant(node)
                                    }
                                >
                                    {node.title}
                                </Button>
                            ))}
                        </Stack>
                    </Box>

                    {/* Quantity */}
                    <Stack
                        direction="row"
                        spacing={2}
                        alignItems="center"
                        sx={{ mt: 4 }}
                    >
                        <Button
                            onClick={() =>
                                setQuantity(Math.max(1, quantity - 1))
                            }
                        >
                            -
                        </Button>

                        <Typography>{quantity}</Typography>

                        <Button
                            onClick={() =>
                                setQuantity(quantity + 1)
                            }
                        >
                            +
                        </Button>
                    </Stack>

                    {/* Buttons */}
                    <Button
                        fullWidth
                        variant="contained"
                        sx={{ mt: 4 }}
                        onClick={() =>
                            addToCart(selectedVariant.id, quantity)
                        }
                    >
                        ADD TO CART
                    </Button>

                    <Button
                        fullWidth
                        variant="outlined"
                        sx={{ mt: 2 }}
                        onClick={() =>
                            addToCart(selectedVariant.id, quantity)
                        }
                    >
                        BUY IT NOW
                    </Button>

                    {/* Description */}
                    <Box sx={{ mt: 6 }}>
                        <Typography variant="h6">
                            Product Details
                        </Typography>

                        <Typography sx={{ mt: 2 }}>
                            {product.description}
                        </Typography>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
};

export default ProductDetails;
