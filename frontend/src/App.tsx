import { Route, Routes, useLocation } from "react-router-dom";
import Product from "@/pages/Product";
import NotFound from "@/pages/NotFound";
import SignUp from "@/pages/SignUp";
import Login from "@/pages/Login";
import About from "@/pages/About";
import Categories from "@/pages/Categories";
import Contact from "@/pages/Contact";
import Home from "@/pages/Home";
import Layout from "@/Layout";

const App = () => {
  const location = useLocation();
  const hideLayout = ["/login", "/sign-up"].includes(location.pathname);
  return (
    <>
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
