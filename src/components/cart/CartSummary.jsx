import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function CartSummary({ total }) {
  const navigate = useNavigate();
  const deliveryFee = 2.99;
  const tax = total * 0.1;
  const finalTotal = total + deliveryFee + tax;

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
      
      <div className="space-y-3">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>{total.toFixed(2)}€</span>
        </div>
        <div className="flex justify-between">
          <span>Delivery Fee</span>
          <span>{deliveryFee.toFixed(2)}€</span>
        </div>
        <div className="flex justify-between">
          <span>Tax</span>
          <span>{tax.toFixed(2)}€</span>
        </div>
        <div className="border-t pt-3">
          <div className="flex justify-between font-semibold">
            <span>Total</span>
            <span>{finalTotal.toFixed(2)}€</span>
          </div>
        </div>
      </div>
      
      <button
        onClick={() => navigate('/checkout')}
        className="w-full mt-6 px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700"
      >
        Proceed to Checkout
      </button>
    </div>
  );
}
