import { Route, Routes } from "react-router-dom";
import Product from "@/pages/users/product/Product";
import NotFound from "@/pages/NotFound";
import SignUp from "@/pages/users/auth/SignUp";
import Login from "@/pages/users/auth/Login";
import About from "@/pages/static/About";
import Categories from "@/pages/users/product/Categories";
import Contact from "@/pages/static/Contact";
import Home from "@/pages/Home";
import Layout from "@/components/layout/Layout";
import { Toaster } from "@/components/ui/toaster";
import ProtectedRoute from "@/components/reuseable/ProtectedRoute";
import { AuthProvider } from "@/context/authcontext";
import { ThemeProvider } from "@/components/themes/theme-provider";
import EmailVerification from "./pages/users/auth/EmailVerification";
import SingleProduct from "./pages/users/product/SingleProduct";
import UpgradeAccount from "./pages/users/settings/UpgradeAccount";
import CreateProduct from "./pages/seller/dashboard/components/CreateProduct";
import Profile from "./pages/users/profile/Profile";
import SellerDashboard from "./pages/seller/dashboard/Dashboard";

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
                                            element={
                                                <ProtectedRoute>
                                                    <SingleProduct />
                                                </ProtectedRoute>
                                            }
                                        />
                                        <Route
                                            path="*"
                                            element={<NotFound />}
                                        />
                                        <Route
                                            path="/settings"
                                            element={
                                                <ProtectedRoute>
                                                    <UpgradeAccount />
                                                </ProtectedRoute>
                                            }
                                        />
                                        <Route
                                            path="/seller/create-product"
                                            element={
                                                <ProtectedRoute>
                                                    <CreateProduct />
                                                </ProtectedRoute>
                                            }
                                        />
                                        <Route
                                            path="/seller/dashboard"
                                            element={
                                                <ProtectedRoute>
                                                    <SellerDashboard />
                                                </ProtectedRoute>
                                            }
                                        />
                                        <Route
                                            path="/profile"
                                            element={
                                                <ProtectedRoute>
                                                    <Profile />
                                                </ProtectedRoute>
                                            }
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
