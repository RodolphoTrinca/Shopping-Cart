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
      <div className="flex items-center">
        <img src={item.image} alt={item.name} className="w-16 h-16 object-cover mr-4" />
        <div>
          <h3 className="font-semibold">{item.name}</h3>
          <p>${item.price.toFixed(2)}</p>
        </div>
      </div>
      <div className="flex items-center">
        <input
          type="number"
          min={1}
          value={item.quantity}
          onChange={e => onUpdateQuantity(item.id, Number(e.target.value))}
          className="w-16 border rounded mr-2 text-center"
        />
        <button
          className="text-red-600 hover:underline"
          onClick={() => onRemove(item.id)}
        >
          Remove
        </button>
      </div>
    </div>
  );
}
