import React from 'react';
import { CartItem } from '../context/CartContext';

interface CartItemProps {
  item: CartItem;
  onRemove: (id: string) => void;
  onUpdateQuantity: (id: string, quantity: number) => void;
}

export default function CartItemComponent({ item, onRemove, onUpdateQuantity }: CartItemProps) {
  return (
    <div className="flex items-center justify-between border-b py-2">
      <div className="flex items-center min-w-[180px] max-w-[250px] sm:min-w-[220px] sm:max-w-[400px] md:min-w-[320px] md:max-w-[700px] lg:min-w-[400px] lg:max-w-[800px]">
        <img src={item.images[0]} alt={item.title} className="w-16 h-16 min-w-[64px] min-h-[64px] max-w-[64px] max-h-[64px] object-contain bg-white border rounded block" />
        <div className="flex flex-col justify-center ml-6 gap-1 flex-1">
          <h3 className="font-semibold w-full line-clamp-2 overflow-hidden text-ellipsis">{item.title}</h3>
          <p className="whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">USD {item.price.toFixed(2)}</p>
          <div className="flex items-center mt-1">
            <label htmlFor={`quantity-${item.id}`} className="mr-2 font-medium text-gray-700 dark:text-gray-200">Quantity:</label>
            <input
              id={`quantity-${item.id}`}
              type="number"
              min={1}
              value={item.quantity}
              onChange={e => onUpdateQuantity(item.id, Number(e.target.value))}
              className="w-16 border rounded mr-2 text-center"
            />
            <span className="ml-4 text-sm font-semibold text-gray-800 dark:text-gray-200">Total: USD {(item.price * item.quantity).toFixed(2)}</span>
          </div>
        </div>
      </div>
      <div className="flex items-center">
        <button
          className="text-red-600 hover:text-red-800 p-2 rounded-full transition-colors"
          onClick={() => onRemove(item.id)}
          aria-label="Remove item"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 7.5V19a2 2 0 002 2h8a2 2 0 002-2V7.5M4 7.5h16M9.5 7.5V5a2.5 2.5 0 015 0v2.5" />
          </svg>
        </button>
      </div>
    </div>
  );
}
