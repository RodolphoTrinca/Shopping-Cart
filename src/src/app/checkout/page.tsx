'use client';

import React from 'react';
import Header from '../../components/Header';
import { useCart } from '../../context/CartContext';
import Link from 'next/link';

export default function CheckoutPage() {
  const { state, dispatch } = useCart();
  const total = state.items.reduce((sum: number, item) => sum + item.price * item.quantity, 0);

  function handleCheckout() {
    dispatch({ type: 'CLEAR_CART' });
    alert('Thank you for your purchase!');
  }

  return (
    <div>
      <Header />
      <main className="max-w-2xl mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4">Checkout</h2>
        {state.items.length === 0 ? (
          <p>Your cart is empty. <Link href="/">Go shopping</Link></p>
        ) : (
          <div>
            <ul>
              {state.items.map((item) => (
                <li key={item.id} className="mb-2">
                  {item.name} x {item.quantity} - ${item.price.toFixed(2)}
                </li>
              ))}
            </ul>
            <div className="text-right font-semibold mt-4">Total: ${total.toFixed(2)}</div>
            <button
              className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              onClick={handleCheckout}
            >
              Confirm Purchase
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
