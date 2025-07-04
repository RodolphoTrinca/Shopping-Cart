'use client';

import React from 'react';
import Header from '../../components/Header';
import { useCart } from '../../context/CartContext';
import Link from 'next/link';
import CartItem from '../../components/CartItem';

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
                  <CartItem
                    item={item}
                    onRemove={() => {}}
                    onUpdateQuantity={() => {}}
                  />
                </li>
              ))}
            </ul>
            <div className="text-right font-semibold mt-4">Total: ${total.toFixed(2)}</div>
            <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-10 z-50">
              <button
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 text-lg shadow-lg"
                onClick={handleCheckout}
              >
                Confirm Purchase
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
