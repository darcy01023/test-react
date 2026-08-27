import { Navigate, Route, Routes } from "react-router-dom";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { Header } from "./components/Header";
import { Home } from "./pages/Home";
import { Products } from "./pages/Products";
import { ProductDetails } from "./pages/ProductDetails";
import { Cart } from "./pages/Cart";
import { Login } from "./pages/Login";
import { Signup } from "./pages/Signup";
import { Admin } from "./pages/Admin";
import { AdminRoute } from "./components/AdminRoute";
import { Payment } from "./pages/Payment";

const App = () => {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-[url(/dist/landing-bg.jpg)] bg-fixed">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/users/signup" element={<Signup />} />
          <Route path="/users/login" element={<Login />} />
          <Route path="/products" element={<Products />} />
          <Route
            path="/products/:id"
            element={<ProductDetails />}
          />
          <Route path="/cart" element={<Cart />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/payment" element={<Payment />} />
          </Route>
          <Route element={<AdminRoute />}>
            <Route path="/admin" element={<Admin />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </>
  );
}

export default App;