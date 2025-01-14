import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { RestaurantProvider } from './context/RestaurantContext';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import RestaurantPage from './pages/restaurant/RestaurantPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import RestaurantDashboard from './pages/restaurant/RestaurantDashboard';

function App() {

  return (
    <Router>
      <AuthProvider>
        <RestaurantProvider>
          <CartProvider>
            <div className="min-h-screen bg-gray-50">
              <Navbar />
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/restaurant/:id" element={<RestaurantPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/checkout" element={<CheckoutPage />} />
                <Route path="/dashboard" element={<RestaurantDashboard />} />
              </Routes>
            </div>
          </CartProvider>
        </RestaurantProvider>
      </AuthProvider>
    </Router>
  );
}

export default App
