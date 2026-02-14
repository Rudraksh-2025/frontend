import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from '../components/Footer'
import LoginModal from "../components/LoginModal";


const Layout = () => {
    return (
        <>
            <Navbar />
            <Outlet />
            <Footer />
            <LoginModal onSuccess={() => {
                const cartId = localStorage.getItem("cartId");
                window.location.href = "/cart"; // or direct checkout
            }} />

        </>
    );
};

export default Layout;
