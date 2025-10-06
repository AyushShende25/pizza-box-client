import {
	queryOptions,
	useMutation,
	useQuery,
	useQueryClient,
} from "@tanstack/react-query";
import { api } from "./axios";
import { useNavigate } from "react-router";
import { TAX_RATE, type Cart } from "@/types/cart";

type AddToCartProps = {
	pizzaId: string;
	crustId: string;
	sizeId: string;
	toppingIds: string[];
	quantity: number;
};

export const cartApi = {
	addToCart: async ({
		pizzaId,
		sizeId,
		crustId,
		toppingIds,
		quantity,
	}: AddToCartProps) => {
		const res = await api.post("/cart/items", {
			pizza_id: pizzaId,
			size_id: sizeId,
			crust_id: crustId,
			topping_ids: toppingIds,
			quantity,
		});
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
	const navigate = useNavigate();
	return useMutation({
		mutationFn: cartApi.addToCart,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["cart"] });
			navigate("/cart");
		},
	});
}

export function useUpdateCartQuantity() {
	const queryClient = useQueryClient();
	// const navigate = useNavigate();
	return useMutation({
		mutationFn: cartApi.updateQuantity,
		onSettled: () => {
			queryClient.invalidateQueries({ queryKey: ["cart"] });
		},
	});
}

export function useRemoveItemFromCart() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: cartApi.removeItemFromCart,
		onMutate: async (itemId) => {
			await queryClient.cancelQueries({ queryKey: ["cart"] });
			const previousCart = queryClient.getQueryData<Cart>(["cart"]);

			queryClient.setQueryData<Cart>(["cart"], (old) => {
				if (!old) return old;
				const updatedItems = old.cart_items.filter((i) => i.id !== itemId);

				const subtotal = updatedItems.reduce(
					(sum, item) => sum + Number(item.total ?? 0),
					0,
				);
				const tax = subtotal * TAX_RATE;
				const total = subtotal + Number(old.delivery_charge) + tax;
				return {
					...old,
					cart_items: updatedItems,
					subtotal: subtotal.toFixed(2),
					tax: tax.toFixed(2),
					total: total.toFixed(2),
				};
			});
			return { previousCart };
		},
		onError: (_err, _variables, context) => {
			queryClient.setQueryData(["cart"], context?.previousCart);
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
		onMutate: async () => {
			await queryClient.cancelQueries({ queryKey: ["cart"] });
			const previousCart = queryClient.getQueryData<Cart>(["cart"]);
			queryClient.setQueryData<Cart>(["cart"], (old) => {
				if (!old) return old;

				return {
					...old,
					cart_items: [],
				};
			});
			return { previousCart };
		},
		onError: (_err, _variables, context) => {
			queryClient.setQueryData(["cart"], context?.previousCart);
		},
		onSettled: () => {
			queryClient.invalidateQueries({ queryKey: ["cart"] });
		},
	});
}
