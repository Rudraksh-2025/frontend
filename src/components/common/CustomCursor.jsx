import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const CustomCursor = () => {
    const cursorRef = useRef(null);
    const followerRef = useRef(null);
    const lastColorRef = useRef("#000");
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 900);
        };

        checkMobile();
        window.addEventListener("resize", checkMobile);

        if (isMobile) {
            document.body.style.cursor = "default";
            return;
        }

        const cursor = cursorRef.current;
        const follower = followerRef.current;

        const onMouseMove = (e) => {
            const { clientX, clientY } = e;

            // Move small dot instantly
            gsap.to(cursor, {
                x: clientX,
                y: clientY,
                duration: 0.1,
            });

            // Move larger follower with delay
            gsap.to(follower, {
                x: clientX,
                y: clientY,
                duration: 0.5,
                ease: "power2.out",
            });

            // Detection for section color
            const target = document.elementFromPoint(clientX, clientY);
            const parentSection = target?.closest('[data-cursor-color]');
            const colorMode = parentSection?.getAttribute('data-cursor-color') || "black";
            const targetColor = colorMode === "white" ? "#fff" : "#000";

            if (lastColorRef.current !== targetColor) {
                lastColorRef.current = targetColor;
                gsap.to(cursor, { backgroundColor: targetColor, duration: 0.3 });
                gsap.to(follower, { borderColor: `rgba(${colorMode === "white" ? "255,255,255" : "0,0,0"}, 0.5)`, duration: 0.3 });
            }
        };

        const onMouseEnterLink = () => {
            gsap.to(cursor, { scale: 0, duration: 0.2 });
            gsap.to(follower, {
                scale: 0,
                backgroundColor: "rgba(255, 255, 255, 0.15)",
                mixBlendMode: "difference",
                duration: 0.3
            });
        };

        const onMouseLeaveLink = () => {
            gsap.to(cursor, { scale: 1, duration: 0.2 });
            gsap.to(follower, {
                scale: 1,
                backgroundColor: "transparent",
                mixBlendMode: "normal",
                duration: 0.3
            });
        };

        document.addEventListener("mousemove", onMouseMove);

        // Add listeners to all interactive elements
        const updateListeners = () => {
            const interactiveElements = document.querySelectorAll("a, button, .cursor-pointer, [role='button']");
            interactiveElements.forEach((el) => {
                el.addEventListener("mouseenter", onMouseEnterLink);
                el.addEventListener("mouseleave", onMouseLeaveLink);
            });
            return interactiveElements;
        };

        const interactiveElements = updateListeners();

        // MutationObserver to catch elements added dynamically
        const observer = new MutationObserver(() => {
            updateListeners();
        });
        observer.observe(document.body, { childList: true, subtree: true });

        // Hide default cursor on body
        document.body.style.cursor = "none";

        return () => {
            window.removeEventListener("resize", checkMobile);
            document.removeEventListener("mousemove", onMouseMove);
            interactiveElements.forEach((el) => {
                el.removeEventListener("mouseenter", onMouseEnterLink);
                el.removeEventListener("mouseleave", onMouseLeaveLink);
            });
            observer.disconnect();
            document.body.style.cursor = "default";
        };

    }, [isMobile]);

    if (isMobile) return null;


    return (
        <>
            {/* Main Dot */}
            <div
                ref={cursorRef}
                style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    width: "8px",
                    height: "8px",
                    backgroundColor: "#000",
                    borderRadius: "50%",
                    pointerEvents: "none",
                    zIndex: 9999,
                    transform: "translate(-50%, -50%)",
                }}
            />
            {/* Follower Circle */}
            <div
                ref={followerRef}
                style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    width: "40px",
                    height: "40px",
                    border: "1px solid rgba(0, 0, 0, 0.5)",
                    borderRadius: "50%",
                    pointerEvents: "none",
                    zIndex: 9998,
                    transform: "translate(-50%, -50%)",
                }}
            />
        </>
    );
};

export default CustomCursor;
