'use client';
import { useCart, Product } from '@/context/CartContext';
import { useState } from 'react';
import AddToCartButton from '@/components/AddToCartButton';

export default function ClientAddToCart({ product }: { product: Product }) {
  const { dispatch } = useCart();
  const [added, setAdded] = useState(false);
  function handleClick() {
    dispatch({ type: 'ADD_ITEM', product });
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  }
  return <AddToCartButton added={added} onClick={handleClick} />;
}
