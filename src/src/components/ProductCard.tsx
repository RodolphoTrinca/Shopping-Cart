import React, { useState } from 'react';
import { Product } from '../context/CartContext';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export default function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const [added, setAdded] = useState(false);

  function handleClick() {
    onAddToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  }

  return (
    <div className="shadow-lg rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-4 flex flex-col items-center transition-transform hover:scale-105 hover:shadow-2xl min-h-[350px]">
      <img
        src={product.image}
        alt={product.name}
        className="w-32 h-32 object-contain mb-4 bg-gray-100 rounded"
        onError={e => (e.currentTarget.src = '/fallback.jpg')}
      />
      <h2 className="text-lg font-semibold mb-1 text-center line-clamp-2 min-h-[48px]">{product.name}</h2>
      <p className="mb-2 text-blue-700 dark:text-blue-300 font-bold text-lg">${product.price.toFixed(2)}</p>
      <button
        className={`w-full mt-auto bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center justify-center font-medium transition-colors ${added ? 'bg-green-600' : ''}`}
        onClick={handleClick}
        disabled={added}
      >
        {added ? (
          <span className="flex items-center">✔ Added</span>
        ) : (
          'Add to Cart'
        )}
      </button>
    </div>
  );
}

// No changes needed in ProductCard.tsx for grid layout. Ensure the parent container (main/page) uses grid classes.
