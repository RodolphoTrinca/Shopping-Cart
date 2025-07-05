"use client";

import React, { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";
import { useCart, Product } from "../context/CartContext";
import { useSearch } from "../context/SearchContext";
import { fetchProductsFromApi } from "../services/productService";
import LoadingScreen from "../components/LoadingScreen";
import ErrorScreen from "../components/ErrorScreen";

export default function Home() {
	const { dispatch } = useCart();
	const { query } = useSearch();
	const [products, setProducts] = useState<Product[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");
	const [visibleCount, setVisibleCount] = useState(3);

	useEffect(() => {
		fetchProductsFromApi()
			.then(setProducts)
			.catch((err) => setError(err.message || "Unknown error"))
			.finally(() => setLoading(false));
	}, []);

	function handleAddToCart(product: Product) {
		dispatch({ type: "ADD_ITEM", product });
	}

	let visibleProducts = products.slice(0, visibleCount);
	if (query) {
		visibleProducts = visibleProducts.filter((p) =>
			p.title.toLowerCase().includes(query.toLowerCase())
		);
	}

	if (loading) 
		return <LoadingScreen />;
	if (error)
		return <ErrorScreen message={error} />;

	return (
		<div className="min-h-screen bg-gray-200 flex flex-col items-center font-[family-name:var(--font-geist-sans)]">
			<div className="w-full max-w-4xl flex flex-col items-center">
				<main className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 p-4">
					{visibleProducts.map((product) => (
						<ProductCard
							key={product.id}
							product={product}
							onAddToCart={handleAddToCart}
						/>
					))}
				</main>
				{visibleCount < products.length && (
					<div className="w-full flex justify-center mt-8">
						<button
							className="flex items-center justify-center gap-2 w-full md:w-[220px] px-6 py-2 bg-white text-black font-bold rounded-xl hover:bg-gray-300 transition"
							onClick={() => setVisibleCount((c) => c + 3)}
						>
							<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
								<path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12s3.75-7.5 9.75-7.5 9.75 7.5 9.75 7.5-3.75 7.5-9.75 7.5S2.25 12 2.25 12z" />
								<circle cx="12" cy="12" r="3" fill="currentColor" />
							</svg>
							View More
						</button>
					</div>
				)}
			</div>
		</div>
	);
}
