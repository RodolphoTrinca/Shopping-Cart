import { fetchProductsFromApi } from '../../../services/productService';
import { Product } from '../../../context/CartContext';
import { notFound } from 'next/navigation';
import ClientAddToCart from '@/components/ClientAddToCart';

interface ProductPageProps {
  params: { id: string };
}

export default async function ProductDetailsPage({ params }: ProductPageProps) {
  const products = await fetchProductsFromApi();
  const product = products.find((p) => p.id === params.id);
  if (!product) return notFound();

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white dark:bg-gray-900 rounded-xl shadow-lg mt-10 flex flex-col md:flex-row gap-8 items-center">
      <div className="w-full md:w-1/2 flex items-center justify-center">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-80 object-contain bg-gray-100 rounded"
        />
      </div>
      <div className="w-full md:w-1/2 flex flex-col gap-4">
        <h1 className="text-2xl font-bold mb-2 text-center md:text-left">{product.name}</h1>
        <p className="text-gray-600 dark:text-gray-300 text-base mb-2 text-center md:text-left">{product.description}</p>
        <span className="text-xl font-semibold text-purple-700 mb-4 text-center md:text-left">USD {product.price.toFixed(2)}</span>
        <ClientAddToCart product={product} />
      </div>
    </div>
  );
}
