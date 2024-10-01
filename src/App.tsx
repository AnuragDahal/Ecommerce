
import { Route, Routes } from "react-router-dom";
import Product from "@/pages/Product";
import NotFound from "@/pages/NotFound";
import SignUp from "@/pages/SignUp";
import Login from "@/pages/Login";
import About from "@/pages/About";
import Categories from "@/pages/Categories";
import Contact from "@/pages/Contact";
import Home from "@/pages/Home";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Product />} />
        <Route path="/about" element={<About />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default App;
