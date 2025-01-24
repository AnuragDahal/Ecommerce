import {Outlet, Route, Routes} from "react-router-dom";
import Product from "@/pages/users/product/Product";
import NotFound from "@/pages/NotFound";
import SignUp from "@/pages/users/auth/SignUp";
import Login from "@/pages/users/auth/Login";
import About from "@/pages/static/About";
import Categories from "@/pages/users/product/Categories";
import Contact from "@/pages/static/Contact";
import Home from "@/pages/Home";
import Layout from "@/components/layout/Layout";
import {Toaster} from "@/components/ui/toaster";
import ProtectedRoute from "@/components/reuseable/ProtectedRoute";
import {AuthProvider} from "@/context/authcontext";
import {ThemeProvider} from "@/components/themes/theme-provider";
import EmailVerification from "./pages/users/auth/EmailVerification";
import SingleProduct from "./pages/users/product/SingleProduct";
import UpgradeAccount from "./pages/users/settings/UpgradeAccount";
import CreateProduct from "./pages/seller/dashboard/_components/CreateProduct";
import Profile from "./pages/users/profile/Profile";
import Analytics from "./pages/seller/dashboard/_components/Analytics";
import Overview from "./pages/seller/dashboard/_components/Overview";
import Orders from "./pages/seller/dashboard/_components/Orders";
import ManageProducts from "./pages/seller/dashboard/_components/ManageProducts";
import DashBoard from "./pages/seller/dashboard/DashBoard";
import ChangePassword from "./pages/users/settings/ChangePassword";
import ForgetPassword from "./pages/users/auth/ForgetPassword";
import ResetPassword from "./pages/users/auth/ResetPassword";
import Cart from "./pages/users/product/Cart";
import MyOrdersPage from "./pages/users/product/Orders";
import StripeCheckout from "./pages/users/auth/StripeCheckout";
import StripeComplete from "./pages/users/auth/StripeComplete";
import {SidebarProvider} from "./components/ui/sidebar";
import Settings from "./pages/users/settings/Settings";

const App = () => {
    return (
        <AuthProvider>
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
                    <Route path="products" element={<Product />} />
                    <Route path="about" element={<About />} />
                    <Route path="categories" element={<Categories />} />
                    <Route path="contact" element={<Contact />} />
                    <Route path="products/:id" element={<SingleProduct />} />
                    {/* Protected Routes */}

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
                        path="profile"
                        element={
                            <ProtectedRoute>
                                <Profile />
                            </ProtectedRoute>
                        }
                    />
                    <Route path="*" element={<NotFound />} />

                    <Route
                        path="settings"
                        element={
                            <ProtectedRoute>
                                <Settings />
                            </ProtectedRoute>
                        }
                    >
                        <Route
                            path="change-password"
                            element={<ChangePassword />}
                        />
                        <Route
                            path="upgrade-account"
                            element={<UpgradeAccount />}
                        />
                    </Route>

                    {/* Seller Dashboard Nested Routes */}

                    <Route path="seller/*" element={<Outlet />}>
                        <Route
                            path="dashboard/*"
                            element={
                                <SidebarProvider>
                                    <DashBoard />
                                </SidebarProvider>
                            }
                        >
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
    );
};

export default App;
