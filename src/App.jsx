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
import ProfilePage from './pages/customer/ProfilePage';
import { OrderProvider } from './context/OrderContext';
import { Toaster } from 'sonner';
import RestaurantNotifications from './pages/restaurant/RestaurantNotifications';
import { SocketProvider } from './context/SocketContext';

function App() {

  return (
    <Router>
      <SocketProvider>
        <AuthProvider>
          <RestaurantProvider>
            <CartProvider>
              <OrderProvider>
                <div className="min-h-screen bg-gray-50">
                  <Toaster position="top-center" richColors />
                  <Navbar />
                  <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/listning" element={<RestaurantNotifications />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/restaurant/:id" element={<RestaurantPage />} />
                    <Route path="/cart" element={<CartPage />} />
                    <Route path="/checkout" element={<CheckoutPage />} />
                    <Route path="/dashboard" element={<RestaurantDashboard />} />
                    <Route path="/profile" element={<ProfilePage />} />
                  </Routes>
                </div>
              </OrderProvider>
            </CartProvider>
          </RestaurantProvider>
        </AuthProvider>
      </SocketProvider>
    </Router>
  );
}

export default App
