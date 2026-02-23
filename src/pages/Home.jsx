import Hero from "../components/home/Hero";
import ProductSlider from "../components/home/ProductSlider";
import ProductGrid from "../components/home/ProductGrid";
import Slider from '../components/home/Slider'
import Manifesto from "../components/home/Manifesto";
import CountdownSale from "../components/home/CountdownSale";

const Home = () => {
    return (
        <>
            <Hero />
            <Manifesto />
            <ProductSlider />
            <Slider />
            <ProductGrid />
            <CountdownSale />
        </>
    );
};

export default Home;


