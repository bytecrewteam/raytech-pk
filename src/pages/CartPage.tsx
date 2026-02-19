import { Navigate } from "react-router-dom";

// Cart is now a drawer — redirect old /cart route to home
const CartPage = () => <Navigate to="/" replace />;

export default CartPage;
