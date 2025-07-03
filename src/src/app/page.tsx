'use client';

import Image from "next/image";
import Header from "../components/Header";
import ProductCard from "../components/ProductCard";
import { useCart, Product } from "../context/CartContext";
import React, { useState, useEffect } from "react";
import { fetchProductsFromApi } from "../services/productService";

export default function Home() {
	const { dispatch } = useCart();
	const [query, setQuery] = useState("");
	const [products, setProducts] = useState<Product[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");
	const [visibleCount, setVisibleCount] = useState(3);
	const [theme, setTheme] = useState<'light' | 'dark'>('dark');

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

	const filtered = products.filter((p) =>
		p.name.toLowerCase().includes(query.toLowerCase())
	);
	const visibleProducts = filtered.slice(0, visibleCount);

	if (loading) return <div className="text-center mt-20">Loading products...</div>;
	if (error) return <div className="text-center mt-20 text-red-500">{error}</div>;

	return (
		<div className={`grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] ${typeof window !== 'undefined' && document.documentElement.classList.contains('dark') ? 'bg-gray-950' : 'bg-white'}`}>
			<Header onSearch={setQuery} />
			<main className="pt-16 max-w-4xl mx-auto p-4 grid grid-cols-1 md:grid-cols-3 gap-6 mt-40">
				{visibleProducts.map((product) => (
					<ProductCard
						key={product.id}
						product={product}
						onAddToCart={handleAddToCart}
					/>
				))}
				{visibleCount < filtered.length && (
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
				<a
					className="flex items-center gap-2 hover:underline hover:underline-offset-4"
					href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
					target="_blank"
					rel="noopener noreferrer"
				>
					<Image
						aria-hidden
						src="/file.svg"
						alt="File icon"
						width={16}
						height={16}
					/>
					Learn
				</a>
				<a
					className="flex items-center gap-2 hover:underline hover:underline-offset-4"
					href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
					target="_blank"
					rel="noopener noreferrer"
				>
					<Image
						aria-hidden
						src="/window.svg"
						alt="Window icon"
						width={16}
						height={16}
					/>
					Examples
				</a>
				<a
					className="flex items-center gap-2 hover:underline hover:underline-offset-4"
					href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
					target="_blank"
					rel="noopener noreferrer"
				>
					<Image
						aria-hidden
						src="/globe.svg"
						alt="Globe icon"
						width={16}
						height={16}
					/>
					Go to nextjs.org →
				</a>
			</footer>
		</div>
	);
}
