import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, User, LogIn } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const { items } = useCart();

  return (
    <nav className="bg-white shadow-lg fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-bold text-orange-500">Lieferspatz</span>
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <Link to="/cart" className="relative">
              <ShoppingCart className="h-6 w-6 text-gray-600 hover:text-orange-500" />
              {items.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-orange-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {items.length}
                </span>
              )}
            </Link>
            <div>
              {user?.balance}
            </div>

            {user ? (
              <div className="flex items-center space-x-2">
                {user.role === "customer" ?
                  (
                    <Link to="/profile" className="flex items-center space-x-2">
                      <User className="h-6 w-6 text-gray-600" />
                      <span className="text-gray-800">{user.name}</span>
                    </Link>
                  ) :
                  (
                    <Link to="/dashboard" className="flex items-center space-x-2">
                      <User className="h-6 w-6 text-gray-600" />
                      <span className="text-gray-800">{user.name}</span>
                    </Link>
                  )
                }
                <Link >
                  <span className="text-gray-800" onClick={logout} >Logout</span>
                </Link>
              </div>
            ) : (
              <Link to="/login" className="flex items-center space-x-2">
                <LogIn className="h-6 w-6 text-gray-600" />
                <span className="text-gray-800">Login</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
