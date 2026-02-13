import { Box, Typography, IconButton } from "@mui/material";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";

const slides = [
    {
        image: "src/assets/images/trackslider6.png",
    },
    {
        image: "src/assets/images/trackslider2.png",
    },
    {
        image: "src/assets/images/trackslider3.png",
    },
    {
        image: "src/assets/images/trackslider4.png",
    },
    {
        image: "src/assets/images/trackslider5.png",
    },
];

export default function Slider() {
    const [sliderRef, instanceRef] = useKeenSlider({
        loop: true,
        drag: (ctx) => {
            return ctx.pointerType === "touch";
        },

        mode: "snap",
        slides: { perView: 1, spacing: 0 },
    });

    return (
        <Box sx={{ position: "relative", overflow: "hidden" }}>
            {/* Slider */}
            <Box ref={sliderRef} className="keen-slider">
                {slides.map((slide, i) => (
                    <Box
                        key={i}
                        className="keen-slider__slide"
                        sx={{
                            position: "relative",
                            height: { xs: 450, md: 700 },
                            backgroundImage: `url(${slide.image})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                    </Box>
                ))}
            </Box>

            {/* Left Arrow */}
            <IconButton
                onClick={() => instanceRef.current?.prev()}
                sx={{
                    display: { xs: "none", md: "flex" },
                    position: "absolute",
                    top: "50%",
                    left: 20,
                    pl: 1.4,
                    transform: "translateY(-50%)",
                    bgcolor: "#fff",
                    "&:hover": { bgcolor: "#eee" },
                }}
            >
                <ArrowBackIos />
            </IconButton>

            {/* Right Arrow */}
            <IconButton
                onClick={() => instanceRef.current?.next()}
                sx={{
                    display: { xs: "none", md: "flex" },
                    position: "absolute",
                    top: "50%",
                    right: 20,
                    transform: "translateY(-50%)",
                    bgcolor: "#fff",
                    "&:hover": { bgcolor: "#eee" },
                }}
            >
                <ArrowForwardIos />
            </IconButton>
        </Box>
    );
}
