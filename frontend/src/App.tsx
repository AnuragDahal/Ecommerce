import { Route, Routes, useLocation } from "react-router-dom";
import Product from "@/pages/product/Product";
import NotFound from "@/pages/NotFound";
import SignUp from "@/pages/auth/SignUp";
import Login from "@/pages/auth/Login";
import About from "@/pages/static/About";
import Categories from "@/pages/product/Categories";
import Contact from "@/pages/static/Contact";
import Home from "@/pages/Home";
import Layout from "@/components/layout/Layout";
import { Toaster } from "./components/ui/toaster";

const App = () => {
    const location = useLocation();
    const hideLayout = ["/login", "/sign-up"].includes(location.pathname);
    return (
        <>
            <Toaster />
            {!hideLayout && (
                <Layout>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/products" element={<Product />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/categories" element={<Categories />} />
                        <Route path="/contact" element={<Contact />} />
                        <Route path="/sign-up" element={<SignUp />} />
                        // <Route path="/login" element={<Login />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </Layout>
            )}
            {hideLayout && (
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/sign-up" element={<SignUp />} />
                </Routes>
            )}
        </>
    );
};

export default App;
