import {
	queryOptions,
	useMutation,
	useQuery,
	useQueryClient,
} from "@tanstack/react-query";
import { api } from "./axios";
import type { Cart } from "@/types/cart";
import { toast } from "sonner";

type AddToCartProps = {
	pizzaId: string;
	crustId: string;
	sizeId: string;
	toppingIds: string[];
	quantity: number;
};

export const cartApi = {
	addToCart: async (addToCartData: AddToCartProps) => {
		const res = await api.post("/cart/items", addToCartData);
		return res.data;
	},
	fetchCart: async (): Promise<Cart> => {
		const res = await api.get("/cart/");
		return res.data;
	},
	removeItemFromCart: async (itemId: string) => {
		const res = await api.delete(`/cart/items/${itemId}`);
		return res.data;
	},
	clearCart: async () => {
		const res = await api.delete("/cart/");
		return res.data;
	},
	updateQuantity: async ({
		itemId,
		quantity,
	}: {
		itemId: string;
		quantity: number;
	}) => {
		const res = await api.put(`/cart/items/${itemId}`, { quantity });
		return res.data;
	},
	mergeGuestCart: async () => {
		const res = await api.post("/cart/merge/");
		return res.data;
	},
};

export const fetchCartQueryOptions = () =>
	queryOptions({
		queryKey: ["cart"],
		queryFn: cartApi.fetchCart,
		staleTime: Number.POSITIVE_INFINITY,
	});

export function useFetchCart() {
	return useQuery(fetchCartQueryOptions());
}

export function useAddToCart() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: cartApi.addToCart,
		onError: () => {
			toast.error("Error adding items to cart");
		},
		onSettled: () => {
			queryClient.invalidateQueries({ queryKey: ["cart"] });
		},
	});
}

export function useUpdateCartQuantity() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: cartApi.updateQuantity,
		onError: () => {
			toast.error("Error updating quantity");
		},
		onSettled: () => {
			queryClient.invalidateQueries({ queryKey: ["cart"] });
		},
	});
}

export function useRemoveItemFromCart() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: cartApi.removeItemFromCart,
		onError: () => {
			toast.error("Error removing quantity");
		},
		onSettled: () => {
			queryClient.invalidateQueries({ queryKey: ["cart"] });
		},
	});
}

export function useClearCart() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: cartApi.clearCart,
		onError: () => {
			toast.error("Error clearing cart items");
		},
		onSettled: () => {
			queryClient.invalidateQueries({ queryKey: ["cart"] });
		},
	});
}

export async function useMergeCart() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: cartApi.mergeGuestCart,
		onError: (err) => {
			console.error("Cart merge failed", err);
			toast.error("Error merging guest cart");
		},
		onSettled: () => {
			queryClient.invalidateQueries({ queryKey: ["cart"] });
		},
	});
}
