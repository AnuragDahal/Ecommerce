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
import ProtectedRoute from "./components/reuseable/ProtectedRoute";
import { AuthProvider } from "./context/authcontext";
import { ThemeProvider } from "./components/themes/theme-provider";

const App = () => {
    const location = useLocation();
    const hideLayout = ["/login", "/sign-up"].includes(location.pathname);

    return (
        <>
            <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
                <AuthProvider>
                    <Toaster />
                    {!hideLayout && (
                        <Layout>
                            <Routes>
                                <Route path="/" element={<Home />} />
                                <Route
                                    path="/products"
                                    element={
                                        <ProtectedRoute>
                                            <Product />
                                        </ProtectedRoute>
                                    }
                                />
                                <Route
                                    path="/about"
                                    element={
                                        <ProtectedRoute>
                                            <About />
                                        </ProtectedRoute>
                                    }
                                />
                                <Route
                                    path="/categories"
                                    element={
                                        <ProtectedRoute>
                                            <Categories />
                                        </ProtectedRoute>
                                    }
                                />
                                <Route
                                    path="/contact"
                                    element={
                                        <ProtectedRoute>
                                            <Contact />
                                        </ProtectedRoute>
                                    }
                                />
                                <Route path="/sign-up" element={<SignUp />} />
                                <Route path="/login" element={<Login />} />
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
                </AuthProvider>
            </ThemeProvider>
        </>
    );
};

export default App;
