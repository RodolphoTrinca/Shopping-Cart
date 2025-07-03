'use client';

import React from 'react';
import Header from '../../components/Header';
import CartItem from '../../components/CartItem';
import { useCart } from '../../context/CartContext';
import Link from 'next/link';

export default function CartPage() {
  const { state, dispatch } = useCart();
  const total = state.items.reduce((sum: number, item) => sum + item.price * item.quantity, 0);

  return (
    <div>
      <Header />
      <main className="max-w-2xl mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
        {state.items.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <div>
            {state.items.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                onRemove={(id: string) => dispatch({ type: 'REMOVE_ITEM', id })}
                onUpdateQuantity={(id: string, quantity: number) => dispatch({ type: 'UPDATE_QUANTITY', id, quantity })}
              />
            ))}
            <div className="text-right font-semibold mt-4">Total: ${total.toFixed(2)}</div>
            <Link href="/checkout">
              <button className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
                Proceed to Checkout
              </button>
            </Link>
          </div>
        )}
      </main>
    </div>
  );
}
