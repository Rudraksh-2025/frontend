import { useState } from "react";
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
    const [isHovered, setIsHovered] = useState(false);
    const autoplay = (slider) => {
        let timeout;
        let mouseOver = false;

        function clearNextTimeout() {
            clearTimeout(timeout);
        }

        function nextTimeout() {
            clearTimeout(timeout);
            if (mouseOver) return;
            timeout = setTimeout(() => {
                slider.next();
            }, 3000); // 3 sec
        }

        slider.on("created", () => {
            slider.container.addEventListener("mouseenter", () => {
                mouseOver = true;
                clearNextTimeout();
            });

            slider.container.addEventListener("mouseleave", () => {
                mouseOver = false;
                nextTimeout();
            });

            nextTimeout();
        });

        slider.on("dragStarted", clearNextTimeout);
        slider.on("animationEnded", nextTimeout);
        slider.on("updated", nextTimeout);
    };
    const [sliderRef, instanceRef] = useKeenSlider({
        loop: true,
        drag: (ctx) => {
            return ctx.pointerType === "touch";
        },

        mode: "snap",
        slides: { perView: 1, spacing: 0 },
    }, [autoplay]);

    return (
        <Box
            sx={{ position: "relative", overflow: "hidden" }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
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
            {isHovered && (
                <IconButton
                    onClick={() => instanceRef.current?.prev()}
                    sx={{
                        display: { xs: "none", md: "flex" },
                        position: "absolute",
                        top: "50%",
                        left: 20,
                        transform: "translateY(-50%)",
                        bgcolor: "#fff",
                        "&:hover": { bgcolor: "#eee" },
                    }}
                >
                    <ArrowBackIos />
                </IconButton>
            )}

            {/* Right Arrow */}
            {isHovered && (
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
            )}
        </Box>
    );
}
