import axios from "axios";
import { Product } from "../context/CartContext";

export async function fetchProductsFromApi(): Promise<Product[]> {
	const res = await axios.get("https://fakestoreapi.com/products");
	return res.data.map((item: any) => ({
		id: String(item.id),
		name: item.title,
		price: item.price,
		image: item.image,
		description: item.description,
	}));
}
