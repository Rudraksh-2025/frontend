import {
    Box,
    Typography,
    Button,
    Grid,
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
            edges { node { url } }
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

    const price = parseFloat(selectedVariant.price.amount);
    const compare = selectedVariant.compareAtPrice
        ? parseFloat(selectedVariant.compareAtPrice.amount)
        : null;

    const discount =
        compare && Math.round(((compare - price) / compare) * 100);

    return (
        <Box sx={{ px: { xs: 3, md: 8 }, py: 6 }}>
            <Grid container spacing={6}>
                {/* LEFT SIDE */}
                <Grid size={{ xs: 12, md: 6 }}>
                    <Grid
                        container
                        spacing={2}
                        direction={{ xs: "column-reverse", md: "row" }}
                    >
                        {/* Thumbnail Slider */}
                        <Grid size={{ xs: 12, md: 2 }}>
                            <Stack
                                direction={{ xs: "row", md: "column" }}
                                spacing={2}
                                sx={{
                                    maxHeight: { md: 500 },
                                    overflowX: { xs: "auto", md: "visible" }
                                }}
                            >
                                {product.images.edges.map((img, i) => (
                                    <Box
                                        key={i}
                                        component="img"
                                        src={img.node.url}
                                        onClick={() => setSelectedImage(img.node.url)}
                                        sx={{
                                            width: { xs: 70, md: "100%" },
                                            cursor: "pointer",
                                            border:
                                                selectedImage === img.node.url
                                                    ? "2px solid black"
                                                    : "1px solid #ddd",
                                            transition: "0.2s",
                                        }}
                                    />
                                ))}
                            </Stack>
                        </Grid>

                        {/* Main Image */}
                        <Grid size={{ xs: 12, md: 10 }}>
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


                {/* RIGHT SIDE */}
                <Grid size={{ xs: 12, md: 6 }}>
                    <Typography
                        sx={{
                            letterSpacing: 2,
                            fontSize: 24,
                            fontWeight: 500,
                        }}
                    >
                        {product.title.toUpperCase()}
                    </Typography>

                    <Stack direction="row" alignItems="center" spacing={1} sx={{ mt: 1 }}>
                        <Rating value={5} readOnly size="small" />
                        <Typography sx={{ fontSize: 14, color: "#777" }}>
                            (4.8)
                        </Typography>
                    </Stack>

                    {/* Save Badge */}
                    {discount && (
                        <Box
                            sx={{
                                mt: 2,
                                display: "inline-block",
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

                    {/* Price */}
                    <Box sx={{ mt: 2 }}>
                        <Typography
                            sx={{
                                color: "#c62828",
                                fontSize: 22,
                                fontWeight: 600,
                                display: "inline",
                                mr: 2,
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

                    {/* Size Selector */}
                    <Box sx={{ mt: 4 }}>
                        <Typography sx={{ mb: 1 }}>Size:</Typography>

                        <Stack direction="row" spacing={2} flexWrap="wrap">
                            {product.variants.edges.map(({ node }) => (
                                <Button
                                    key={node.id}
                                    variant="outlined"
                                    onClick={() => setSelectedVariant(node)}
                                    sx={{
                                        borderColor:
                                            selectedVariant.id === node.id
                                                ? "#000"
                                                : "#ccc",
                                        backgroundColor:
                                            selectedVariant.id === node.id
                                                ? "#000"
                                                : "transparent",
                                        color:
                                            selectedVariant.id === node.id
                                                ? "#fff"
                                                : "#000",
                                        minWidth: 60,
                                    }}
                                >
                                    {node.title}
                                </Button>
                            ))}
                        </Stack>
                    </Box>

                    {/* Quantity */}
                    <Stack
                        direction="row"
                        alignItems="center"
                        sx={{
                            mt: 4,
                            border: "1px solid #ccc",
                            width: 80,
                            justifyContent: "space-between",
                            px: 1,

                        }}
                    >
                        <Button sx={{ minWidth: '0px' }} onClick={() => setQuantity(Math.max(1, quantity - 1))}>
                            -
                        </Button>
                        <Typography>{quantity}</Typography>
                        <Button sx={{ minWidth: '0px' }} onClick={() => setQuantity(quantity + 1)}>+</Button>
                    </Stack>

                    {/* Add to Cart */}
                    <Button
                        fullWidth
                        sx={{
                            mt: 4,
                            background:
                                "linear-gradient(to right, #111, #333)",
                            color: "#fff",
                            py: 1.5,
                            "&:hover": {
                                background: "#000",
                            },
                        }}
                        onClick={() =>
                            addToCart(selectedVariant.id, quantity)
                        }
                    >
                        ADD TO CART
                    </Button>

                    {/* Buy Now */}
                    <Button
                        fullWidth
                        sx={{
                            mt: 2,
                            background: "#000",
                            color: "#fff",
                            py: 1.5,
                            "&:hover": {
                                background: "#222",
                            },
                        }}
                        onClick={() =>
                            addToCart(selectedVariant.id, quantity)
                        }
                    >
                        BUY IT NOW
                    </Button>

                    {/* Product Highlights */}
                    <Box sx={{ mt: 6 }}>
                        <Typography sx={{ mb: 2, fontWeight: 600 }}>
                            Product Highlights
                        </Typography>

                        <ul style={{ lineHeight: 1.8 }}>
                            <li>100% Premium Biowashed Cotton</li>
                            <li>Elastic Drawstrings Attached</li>
                            <li>Heavy Weight Brushed Cotton Fleece</li>
                            <li>Baggy Straight Fit Sweatpants</li>
                            <li>Melange Grey Colour</li>
                            <li>Hypo-Allergic Fabric</li>
                        </ul>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
};

export default ProductDetails;
