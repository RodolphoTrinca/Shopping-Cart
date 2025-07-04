'use client';

import Image from "next/image";
import Header from "../components/Header";
import ProductCard from "../components/ProductCard";
import { useCart, Product } from "../context/CartContext";
import React, { useState, useEffect } from "react";
import { fetchProductsFromApi } from "../services/productService";
import Link from "next/link";

export default function Home() {
	const { dispatch } = useCart();
	const [query, setQuery] = useState("");
	const [products, setProducts] = useState<Product[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");
	const [visibleCount, setVisibleCount] = useState(3);
	const [theme, setTheme] = useState<'light' | 'dark'>('light');

	useEffect(() => {
		async function fetchProducts() {
			try {
				const mapped = await fetchProductsFromApi();
				setProducts(mapped);
			} catch (err: any) {
				setError(err.message || "Unknown error");
			} finally {
				setLoading(false);
			}
		}
		fetchProducts();
	}, []);

	function handleAddToCart(product: Product) {
		dispatch({ type: "ADD_ITEM", product });
	}

	// Only consider products that are visible on screen for filtering
	let visibleProducts = products.slice(0, visibleCount);
	if (query) {
		visibleProducts = visibleProducts.filter((p) =>
			p.name.toLowerCase().includes(query.toLowerCase())
		);
	}

	if (loading) return <div className="text-center mt-20">Loading products...</div>;
	if (error) return <div className="text-center mt-20 text-red-500">{error}</div>;

	return (
		<div className={`grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] ${typeof window !== 'undefined' && document.documentElement.classList.contains('dark') ? 'bg-gray-950' : 'bg-white'}`}>
			<Header onSearch={setQuery} />
			<main className="pt-16 max-w-4xl mx-auto p-4 grid grid-cols-1 md:grid-cols-3 gap-6 md:mt-160 lg:mt-80">
				{visibleProducts.map((product) => (
					<ProductCard
						product={product}
						onAddToCart={handleAddToCart}
					/>
				))}
				{visibleCount < products.length && (
					<div className="col-span-full flex justify-center mt-4">
						<button
							className="flex items-center justify-center gap-2 w-full md:w-[220px] px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
							onClick={() => setVisibleCount((c) => c + 3)}
						>
							<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
								<path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12s3.75-7.5 9.75-7.5 9.75 7.5 9.75 7.5-3.75 7.5-9.75 7.5S2.25 12 2.25 12z" />
								<path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
							</svg>
							View More
						</button>
					</div>
				)}
			</main>
			<footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
				<p className="text-sm text-gray-500 dark:text-gray-400">
					© {new Date().getFullYear()} Shopping Cart. All rights reserved.
				</p>
			</footer>
		</div>
	);
}
