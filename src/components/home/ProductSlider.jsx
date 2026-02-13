import { useEffect, useState, useContext } from "react";
import { shopifyQuery } from "../../services/shopify";
import { CartContext } from "../../context/CartContext";
import {
    Box,
    Typography,
    Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Navigation } from "swiper/modules";
import "swiper/css/navigation";

const ProductSlider = () => {
    const [products, setProducts] = useState([]);
    const { addToCart } = useContext(CartContext);
    const navigate = useNavigate();

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        const query = `
      {
        products(first:8){
          edges{
            node{
              id
              title
               handle
              images(first:1){edges{node{url}}}
              variants(first:1){edges{node{id price{amount}}}}
            }
          }
        }
      }
    `;
        const data = await shopifyQuery(query);
        setProducts(data.products.edges);
    };

    return (
        <Box sx={{ py: 8 }}>
            <Typography
                variant="h4"
                sx={{
                    textAlign: "center",
                    letterSpacing: 6,
                    mb: 5,
                }}
            >
                PANTS
            </Typography>

            {/* Wrapper for positioning arrows */}
            <Box sx={{ position: "relative" }}>

                {/* Custom Prev Button */}
                <Box className="custom-prev" sx={{ ...navButtonStyle, left: 10 }}>
                    ‹
                </Box>

                {/* Custom Next Button */}
                <Box className="custom-next" sx={{ ...navButtonStyle, right: 10 }}>
                    ›
                </Box>

                <Swiper
                    modules={[Navigation]}
                    navigation={{
                        prevEl: ".custom-prev",
                        nextEl: ".custom-next",
                    }}
                    spaceBetween={30}
                    slidesPerView={4}
                    breakpoints={{
                        320: { slidesPerView: 1 },
                        600: { slidesPerView: 2 },
                        768: { slidesPerView: 3 },
                        1200: { slidesPerView: 4 },
                    }}
                >
                    {products.map(({ node }) => (
                        <SwiperSlide key={node.id}>
                            <Box
                                sx={{
                                    textAlign: "center",
                                    cursor: "pointer",
                                }}
                                onClick={() => navigate(`/product/${node.handle}`)}
                            >
                                <Box
                                    component="img"
                                    src={node.images.edges[0]?.node.url}
                                    sx={{
                                        width: "100%",
                                        height: 250,
                                        objectFit: "contain",
                                    }}
                                />

                                <Typography sx={{ mt: 2 }}>
                                    {node.title}
                                </Typography>

                                <Typography sx={{ fontWeight: 600, mt: 1 }}>
                                    ₹{node.variants.edges[0].node.price.amount}
                                </Typography>

                                <Button
                                    variant="contained"
                                    sx={{ mt: 2 }}
                                    onClick={(e) => {
                                        e.stopPropagation(); // prevent navigation
                                        addToCart(node.variants.edges[0].node.id);
                                    }}
                                >
                                    Add to Cart
                                </Button>
                            </Box>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </Box>
        </Box>
    );

};

export default ProductSlider;

const navButtonStyle = {
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    zIndex: 10,
    background: "black",
    color: "white",
    width: 40,
    height: 40,
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    fontSize: "22px",
};


