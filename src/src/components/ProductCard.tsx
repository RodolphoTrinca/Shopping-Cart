import React, { useState } from 'react';
import { Product } from '../context/CartContext';
import AddToCartButton from './AddToCartButton';
import Link from 'next/link';

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
    <div className="shadow-lg rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-4 flex flex-col items-center transition-transform hover:scale-105 hover:shadow-2xl min-h-[400px] h-[420px]">
      <div className="relative w-full flex-1 flex items-center justify-center mb-4 overflow-hidden" style={{ minHeight: '60%', height: '60%' }}>
        <Link key={product.id} href={`/product/${product.id}`}>
            <img
              src={product.images.indexOf(product.images[0]) !== -1 ? product.images[0] : '/fallback.jpg'}
              alt={product.title}
              className="w-full h-full object-contain bg-gray-100 rounded transition-all duration-200"
              style={{ display: 'block', width: '100%', height: '100%' }}
              onError={e => (e.currentTarget.src = '/fallback.jpg')}
            />
            <span className="absolute bottom-3 right-0 bg-purple-600 text-white text-xs font-bold px-3 py-1 shadow-md">
              USD {product.price.toFixed(2)}
            </span>
        </Link>
      </div>
      <h5 className="text-md font-semibold mb-1 text-center line-clamp-2 min-h-[48px]">{product.title}</h5>
      <p className="text-gray-600 dark:text-gray-300 text-sm text-center mb-2 line-clamp-2 min-h-[36px]">{product.description}</p>
      <AddToCartButton added={added} onClick={handleClick} />
    </div>
  );
}
