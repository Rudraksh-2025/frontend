import Hero from "../components/home/Hero";
import ProductSlider from "../components/home/ProductSlider";
import ProductGrid from "../components/home/ProductGrid";
import Slider from '../components/home/Slider'
import Manifesto from "../components/home/Manifesto";
import CountdownSale from "../components/home/CountdownSale";
import ScrollReveal from "../components/common/ScrollReveal";

const Home = () => {
    return (
        <>
            <Hero />
            <ScrollReveal>
                <ProductSlider />
            </ScrollReveal>

            <ScrollReveal>
                <Slider />
            </ScrollReveal>

            <ScrollReveal>
                <ProductGrid />
            </ScrollReveal>

            <ScrollReveal>
                <CountdownSale />
            </ScrollReveal>
            <ScrollReveal>
                <Manifesto />
            </ScrollReveal>
        </>
    );
};

export default Home;



