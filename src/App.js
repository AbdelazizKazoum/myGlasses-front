import { Routes, Route, useLocation } from "react-router-dom";
import { Provider, useDispatch } from "react-redux";
import store from "./store/store";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./components/Home";
import Wishlist from "./components/Wishlist";
import ProductDetailsCard from "./pages/ProductDetails";
import Profile from "./pages/Profile";
import ErrorCard from "./components/ErrorCard";
import LoginPage from "./components/LoginPage";
import SignUpPage from "./components/SignUpPage";
import ProtectedRoute from "./components/ProtectedRoute";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./App.css";
import AdminLayout from "./pages/dashboard/AdminLayout";
import ProductsPage from "./pages/dashboard/products/Index";
import UsersPage from "./pages/dashboard/users";
import AnalyticsPage from "./pages/dashboard/analytics/Index";
import HomePage from "./pages/dashboard/home/Index";
import CommandsPage from "./pages/dashboard/commands/Index";
import { useEffect, useState } from "react";
import { checkAuth } from "./store/authSlice";
import Loader from "./components/Loader";
import GuestOnly from "./components/ProtectedRoute/GuestOnly";
import CheckoutPage from "./pages/CheckoutPage";
import SettingsPage from "./pages/dashboard/settings/Index";
import AddProduct from "./pages/dashboard/products/add/Index";
import Cart from "./pages/cart";
import Products from "./pages/products";

function App() {
  // Determine if Navbar should be displayed based on current path
  // const showNavbar = location.pathname !== "/login" && location.pathname !== "/signup";

  // Hooks

  const [loading, setLoading] = useState(true);

  const location = useLocation();
  const showNavbar =
    location.pathname !== "/login" &&
    location.pathname !== "/signup" &&
    !location.pathname.startsWith("/admin");
  const showFooter =
    location.pathname !== "/login" &&
    location.pathname !== "/signup" &&
    !location.pathname.startsWith("/admin");

  const dispatch = useDispatch();

  useEffect(() => {
    setLoading(true);

    (async () => {
      await dispatch(checkAuth());
      setLoading(false);
    })();
  }, [dispatch]);

  if (loading) return <Loader />;

  return (
    <Provider store={store}>
      {showNavbar && <Navbar />}
      <div className="main-container">
        <ToastContainer />
        <div className="responsive-container">
          <Routes>
            {/* ------------------ Admin Dashboard ----------------- */}
            <Route
              exact
              path="/admin"
              element={
                <AdminLayout>
                  <HomePage />
                </AdminLayout>
              }
            />

            <Route
              exact
              path="/admin/products"
              element={
                <AdminLayout>
                  <ProductsPage />
                </AdminLayout>
              }
            />

            <Route
              exact
              path="/admin/products/add"
              element={
                <AdminLayout>
                  <AddProduct />
                </AdminLayout>
              }
            />

            <Route
              exact
              path="/admin/users"
              element={
                <AdminLayout>
                  <UsersPage />
                </AdminLayout>
              }
            />

            <Route
              exact
              path="/admin/analytics"
              element={
                <AdminLayout>
                  <AnalyticsPage />
                </AdminLayout>
              }
            />

            <Route
              exact
              path="/admin/analytics"
              element={
                <AdminLayout>
                  <AnalyticsPage />
                </AdminLayout>
              }
            />

            <Route
              exact
              path="/admin/commands"
              element={
                <AdminLayout>
                  <CommandsPage />
                </AdminLayout>
              }
            />

            <Route
              exact
              path="/admin/settings"
              element={
                <AdminLayout>
                  <SettingsPage />
                </AdminLayout>
              }
            />

            {/* ---------------------------------------------------- */}
            <Route
              exact
              path="/login"
              element={
                <GuestOnly>
                  <LoginPage />
                </GuestOnly>
              }
            />
            <Route
              exact
              path="/signup"
              element={
                <GuestOnly>
                  <SignUpPage />
                </GuestOnly>
              }
            />
            <Route exact path="/" element={<Home />} />
            <Route exact path="/products" element={<Products />} />

            <Route exact path="/product/:id" element={<ProductDetailsCard />} />
            <Route exact path="/cart" element={<Cart />} />
            <Route exact path="/wishlist" element={<Wishlist />} />
            <Route
              exact
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              exact
              path="/checkout"
              element={
                <ProtectedRoute>
                  <CheckoutPage />
                </ProtectedRoute>
              }
            />
            <Route
              exact
              path="/not-found"
              element={
                <ProtectedRoute>
                  <ErrorCard />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </div>
      {showFooter && <Footer />}
    </Provider>
  );
}

export default App;
