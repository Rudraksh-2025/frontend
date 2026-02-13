import Hero from "../components/home/Hero";
import ProductSlider from "../components/home/ProductSlider";
import ProductGrid from "../components/home/ProductGrid";
import Slider from '../components/home/Slider'

const Home = () => {
    return (
        <>
            <Hero />
            <ProductSlider />
            <Slider />
            <ProductGrid />
        </>
    );
};

export default Home;
