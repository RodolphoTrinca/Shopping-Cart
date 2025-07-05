import axios from "axios";
import { Product } from "../context/CartContext";

export async function fetchProductsFromApi(): Promise<Product[]> {
	const res = await axios.get("https://fakestoreapi.com/products");
	return res.data.map((item: any) => ({
		id: String(item.id),
		title: item.title,
		price: item.price,
		images: [item.image, item.image, item.image, item.image], // Placeholder for multiple images
		description: item.description,
		rating: item.rating ? { rate: item.rating.rate, count: item.rating.count } : undefined,
		colors: [{ name: "Default", hex: "#000000" }, { name: "Red", hex: "#FF0000" }, { name: "Green", hex: "#00FF00" }, { name: "Blue", hex: "#0000FF" }], // Placeholder for color
		keyFeatures: ["Feature 1", "Feature 2", "Feature 3", "Feature 4"], // Placeholder for key features
	}));
}

export async function fetchProductById(id: string): Promise<Product | null> {
	try {
		const products = await fetchProductsFromApi();
		return products.find((item) => item.id === id) || null;
	} catch (error) {
		console.error("Error fetching product by ID:", error);
	}
	return null;
}