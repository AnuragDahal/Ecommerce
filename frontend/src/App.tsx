import { Route, Routes } from "react-router-dom";
import Product from "@/pages/product/Product";
import NotFound from "@/pages/NotFound";
import SignUp from "@/pages/auth/SignUp";
import Login from "@/pages/auth/Login";
import About from "@/pages/static/About";
import Categories from "@/pages/product/Categories";
import Contact from "@/pages/static/Contact";
import Home from "@/pages/Home";
import Layout from "@/components/layout/Layout";
import { Toaster } from "@/components/ui/toaster";
import ProtectedRoute from "@/components/reuseable/ProtectedRoute";
import { AuthProvider } from "@/context/authcontext";
import { ThemeProvider } from "@/components/themes/theme-provider";
import EmailVerification from "./pages/auth/EmailVerification";
import SingleProduct from "./pages/product/SingleProduct";
import UpgradeAccount from "./pages/settings/UpgradeAccount";

const App = () => {
    return (
        <>
            <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
                <AuthProvider>
                    <Toaster />
                    <Routes>
                        <Route path="/login" element={<Login />} />
                        <Route path="/sign-up" element={<SignUp />} />
                        <Route
                            path="/verify-email"
                            element={<EmailVerification />}
                        />
                        <Route
                            path="/*"
                            element={
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
                                        <Route
                                            path="/products/:id"
                                            element={<SingleProduct />}
                                        />
                                        <Route
                                            path="*"
                                            element={<NotFound />}
                                        />
                                        <Route
                                            path="/settings"
                                            element={<UpgradeAccount />}
                                        />
                                    </Routes>
                                </Layout>
                            }
                        />
                    </Routes>
                </AuthProvider>
            </ThemeProvider>
        </>
    );
};

export default App;
