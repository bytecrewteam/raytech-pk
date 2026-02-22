import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { StoreProvider } from "@/contexts/StoreContext";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { ReactNode } from "react";
import ScrollToTop from "@/components/ScrollToTop";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import CartPage from "./pages/CartPage";
import WishlistPage from "./pages/WishlistPage";
import AccountPage from "./pages/AccountPage";
import DealsPage from "./pages/DealsPage";
import SearchPage from "./pages/SearchPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import CheckoutPage from "./pages/CheckoutPage";
import ShopCategoryPage from "./pages/ShopCategoryPage";
import ShippingPage from "./pages/ShippingPage";
import ReturnsPage from "./pages/ReturnsPage";
import FAQPage from "./pages/FAQPage";
import AllProductsPage from "./pages/AllProductsPage";

const queryClient = new QueryClient();

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return <>{children}</>;
};

const PublicRoute = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated } = useAuth();
  if (isAuthenticated) return <Navigate to="/" replace />;
  return <>{children}</>;
};

const AppRoutes = () => (
  <>
    <ScrollToTop />
    <Routes>
      {/* Public Routes - accessible without login */}
      <Route path="/login" element={<PublicRoute><LoginPage /></PublicRoute>} />
      <Route path="/signup" element={<PublicRoute><SignupPage /></PublicRoute>} />
      <Route path="/" element={<Index />} />
      <Route path="/products" element={<AllProductsPage />} />
      <Route path="/deals" element={<DealsPage />} />
      <Route path="/search" element={<SearchPage />} />
      <Route path="/product/:id" element={<ProductDetailPage />} />
      <Route path="/shop/:category" element={<ShopCategoryPage />} />
      <Route path="/support/shipping" element={<ShippingPage />} />
      <Route path="/support/returns" element={<ReturnsPage />} />
      <Route path="/support/faq" element={<FAQPage />} />
      
      {/* Protected Routes - require login */}
      <Route path="/cart" element={<ProtectedRoute><CartPage /></ProtectedRoute>} />
      <Route path="/wishlist" element={<ProtectedRoute><WishlistPage /></ProtectedRoute>} />
      <Route path="/account" element={<ProtectedRoute><AccountPage /></ProtectedRoute>} />
      <Route path="/checkout" element={<ProtectedRoute><CheckoutPage /></ProtectedRoute>} />
      
      {/* 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  </>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <StoreProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </StoreProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
