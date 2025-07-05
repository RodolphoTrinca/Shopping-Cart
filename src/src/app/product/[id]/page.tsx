import { fetchProductById } from '../../../services/productService';
import { notFound } from 'next/navigation';
import ClientAddToCart from '@/components/ClientAddToCart';

interface ProductPageProps {
  params: { id: string };
}

export default async function ProductDetailsPage(props: ProductPageProps) {
  const params = props.params;
  const product = await fetchProductById(params.id);
  if (!product) return notFound();

  // Ensure arrays for hydration consistency
  const images = Array.isArray(product.images) ? product.images : [];
  const colors = Array.isArray(product.colors) ? product.colors : [];
  const keyFeatures = Array.isArray(product.keyFeatures) ? product.keyFeatures : [];

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-10 px-2 flex justify-center items-start">
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl max-w-4xl w-full flex flex-col md:flex-row gap-10 p-8">
        {/* Left: Images */}
        <div className="flex flex-col gap-4 md:w-1/2">
          <div className="w-full h-80 bg-gray-100 rounded-xl flex items-center justify-center overflow-hidden">
            <img src={images[0]} alt={product.title} className="object-contain w-full h-full" />
          </div>
          <div className="flex gap-2 justify-center">
            {images.map((thumb, idx) => (
              <img key={thumb + idx} src={thumb} alt="Thumbnail" className="w-16 h-16 object-contain bg-gray-200 rounded cursor-pointer border border-gray-300" />
            ))}
          </div>
        </div>
        {/* Right: Details */}
        <div className="flex flex-col gap-4 md:w-1/2">
          <h2 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">{product.title}</h2>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-yellow-400 text-lg">★</span>
            <span className="text-gray-700 dark:text-gray-300 font-medium">{product.rating?.rate}</span>
            <span className="text-gray-400 text-sm">({product.rating?.count} reviews)</span>
          </div>
          <span className="text-2xl font-semibold text-purple-700 mb-2">USD {product.price.toFixed(2)}</span>
          <p className="text-gray-600 dark:text-gray-300 text-base mb-4">{product.description}</p>
          <div className="flex flex-col gap-2 mb-4">
            <label className="font-medium text-gray-700 dark:text-gray-200">Color:</label>
            <div className="flex gap-2">
              {colors.length > 0 ? (
                colors.map((color: any, idx: number) => (
                  <button
                    key={(color.hex || color.name || color) + idx}
                    className="w-8 h-8 rounded-full border-2 border-gray-300 focus:ring-2 focus:ring-purple-500"
                    style={{ backgroundColor: color.hex || color }}
                    aria-label={color.name || color}
                  ></button>
                ))
              ) : (
                <span className="text-gray-400">No colors available</span>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-2 mb-4">
            <label className="font-medium text-gray-700 dark:text-gray-200">Quantity:</label>
            <input type="number" min={1} defaultValue={1} className="w-20 px-2 py-1 border rounded focus:outline-none" />
          </div>
          <ClientAddToCart product={product} />
          <div className="flex gap-4 mt-4">
            <button className="flex-1 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition">Wishlist</button>
            <button className="flex-1 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition">Share</button>
          </div>
          <div className="mt-6">
            <h3 className="font-semibold text-lg mb-2 text-gray-900 dark:text-white">Key Features:</h3>
            <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-1">
              {keyFeatures.length > 0 ? (
                keyFeatures.map((feature: string, idx: number) => (
                  <li key={feature + idx}>{feature}</li>
                ))
              ) : (
                <li>No key features listed.</li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
