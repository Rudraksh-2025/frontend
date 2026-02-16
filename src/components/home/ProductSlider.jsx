import { useEffect, useState, useContext, useRef } from "react";
import { shopifyQuery } from "../../services/shopify";
import { CartContext } from "../../context/CartContext";
import { Box, Typography, IconButton } from "@mui/material";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Navigation } from "swiper/modules";
import "swiper/css/navigation";

const ProductSlider = () => {
    const [products, setProducts] = useState([]);
    const [isBeginning, setIsBeginning] = useState(true);
    const [isEnd, setIsEnd] = useState(false);

    const navigate = useNavigate();

    const prevRef = useRef(null);
    const nextRef = useRef(null);

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

    const updateNav = (swiper) => {
        // delay ensures layout + images loaded
        setTimeout(() => {
            setIsBeginning(swiper.isBeginning);
            setIsEnd(swiper.isEnd);
        }, 50);
    };


    return (
        <Box sx={{ py: { xs: 3, md: 8 } }}>
            <Typography
                variant="h4"
                sx={{
                    textAlign: "center",
                    letterSpacing: 3,
                    mb: 1,
                }}
            >
                PANTS
            </Typography>

            {/* Wrapper for positioning arrows */}
            <Box sx={{ position: "relative" }}>

                {/* Custom Prev Button */}
                <IconButton
                    ref={prevRef}
                    sx={{
                        display: { xs: "none", md: "flex", },
                        position: "absolute",
                        top: "40%",
                        left: 20,
                        pl: 1.2,
                        pr: 0.5,
                        zIndex: 10,
                        transform: "translateY(-50%)",
                        bgcolor: "lightgray",
                        "&:hover": { bgcolor: "#eee" },
                        opacity: isBeginning ? 0 : 1,
                        pointerEvents: isBeginning ? "none" : "auto",

                    }}
                >
                    <ArrowBackIos />
                </IconButton>

                {/* Custom Next Button */}
                <IconButton
                    ref={nextRef}
                    sx={{
                        display: { xs: "none", md: "flex", },
                        position: "absolute",
                        top: "40%",
                        right: 20,
                        zIndex: 10,
                        transform: "translateY(-50%)",
                        bgcolor: "lightgray",
                        "&:hover": { bgcolor: "#eee" },
                        opacity: isEnd ? 0 : 1,
                        pointerEvents: isEnd ? "none" : "auto",

                    }}
                >
                    <ArrowForwardIos />
                </IconButton>

                <Swiper
                    modules={[Navigation]}
                    onBeforeInit={(swiper) => {
                        swiper.params.navigation.prevEl = prevRef.current;
                        swiper.params.navigation.nextEl = nextRef.current;
                    }}
                    navigation={{
                        prevEl: prevRef.current,
                        nextEl: nextRef.current,
                    }}
                    watchOverflow
                    onAfterInit={(swiper) => updateNav(swiper)}
                    onSlideChange={(swiper) => updateNav(swiper)}
                    onResize={(swiper) => updateNav(swiper)}
                    onObserverUpdate={(swiper) => updateNav(swiper)}
                    touchRatio={1}
                    simulateTouch={true}
                    allowTouchMove={true}
                    spaceBetween={30}
                    slidesPerView={4}
                    breakpoints={{
                        320: { slidesPerView: 1.8 },
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
                                        height: 300,
                                        objectFit: "contain",
                                    }}
                                />

                                <Typography sx={{ mt: 2 }}>
                                    {node.title}
                                </Typography>

                                <Typography sx={{ fontWeight: 600, mt: 1 }}>
                                    ₹{node.variants.edges[0].node.price.amount}
                                </Typography>

                                {/* <Button
                                    variant="contained"
                                    sx={{ mt: 2 }}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        addToCart(node.variants.edges[0].node.id);
                                    }}
                                >
                                    Add to Cart
                                </Button> */}
                            </Box>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </Box>
        </Box>
    );

};

export default ProductSlider;


