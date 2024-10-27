import { Outlet, Route, Routes } from "react-router-dom";
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
import CreateProduct from "./pages/seller/dashboard/_components/CreateProduct";
import Profile from "./pages/users/profile/Profile";
import Analytics from "./pages/seller/dashboard/_components/Analytics";
import Overview from "./pages/seller/dashboard/_components/Overview";
import Orders from "./pages/seller/dashboard/_components/Orders";
import ManageProducts from "./pages/seller/dashboard/_components/ManageProducts";
import SideBar from "./pages/seller/dashboard/_components/SideBar";
import ChangePassword from "./pages/users/settings/ChangePassword";
import ForgetPassword from "./pages/users/auth/ForgetPassword";
import ResetPassword from "./pages/users/auth/ResetPassword";
import Cart from "./pages/users/product/Cart";
import MyOrdersPage from "./pages/users/product/Orders";
import StripeCheckout from "./pages/users/auth/StripeCheckout";
import StripeComplete from "./pages/users/auth/StripeComplete";

const App = () => (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <AuthProvider>
            <Toaster />

            <Routes>
                {/* Auth Routes */}
                <Route path="/login" element={<Login />} />
                <Route path="/sign-up" element={<SignUp />} />
                <Route path="/verify-email" element={<EmailVerification />} />
                <Route path="/forgot-password" element={<ForgetPassword />} />
                <Route path="/reset-password" element={<ResetPassword />} />

                {/* Main App Layout with Nested Routes */}
                <Route path="/*" element={<Layout />}>
                    <Route index element={<Home />} />

                    {/* Protected Routes */}
                    <Route
                        path="products"
                        element={
                            <ProtectedRoute>
                                <Product />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="complete"
                        element={
                            <ProtectedRoute>
                                <StripeComplete />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="checkout"
                        element={
                            <ProtectedRoute>
                                <StripeCheckout />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="cart"
                        element={
                            <ProtectedRoute>
                                <Cart />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="orders"
                        element={
                            <ProtectedRoute>
                                <MyOrdersPage />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="about"
                        element={
                            <ProtectedRoute>
                                <About />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="categories"
                        element={
                            <ProtectedRoute>
                                <Categories />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="contact"
                        element={
                            <ProtectedRoute>
                                <Contact />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="products/:id"
                        element={
                            <ProtectedRoute>
                                <SingleProduct />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="profile"
                        element={
                            <ProtectedRoute>
                                <Profile />
                            </ProtectedRoute>
                        }
                    />
                    <Route path="*" element={<NotFound />} />

                    {/* Settings Nested Routes */}
                    <Route path="settings/*" element={<Outlet />}>
                        <Route
                            path="upgrade-account"
                            element={
                                <ProtectedRoute>
                                    <UpgradeAccount />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="change-password"
                            element={
                                <ProtectedRoute>
                                    <ChangePassword />
                                </ProtectedRoute>
                            }
                        />
                    </Route>

                    {/* Seller Dashboard Nested Routes */}
                    <Route path="seller/*" element={<Outlet />}>
                        <Route
                            path="create-product"
                            element={
                                <ProtectedRoute>
                                    <CreateProduct />
                                </ProtectedRoute>
                            }
                        />
                        <Route path="dashboard/*" element={<SideBar />}>
                            <Route
                                path="overview"
                                element={
                                    <ProtectedRoute>
                                        <Overview />
                                    </ProtectedRoute>
                                }
                            />
                            <Route
                                path="create-product"
                                element={
                                    <ProtectedRoute>
                                        <CreateProduct />
                                    </ProtectedRoute>
                                }
                            />
                            <Route
                                path="view-orders"
                                element={
                                    <ProtectedRoute>
                                        <Orders />
                                    </ProtectedRoute>
                                }
                            />
                            <Route
                                path="manage-products"
                                element={
                                    <ProtectedRoute>
                                        <ManageProducts />
                                    </ProtectedRoute>
                                }
                            />
                            <Route
                                path="analytics"
                                element={
                                    <ProtectedRoute>
                                        <Analytics />
                                    </ProtectedRoute>
                                }
                            />
                        </Route>
                    </Route>
                </Route>
            </Routes>
        </AuthProvider>
    </ThemeProvider>
);

export default App;
