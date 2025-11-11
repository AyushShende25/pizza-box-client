import {
	queryOptions,
	useMutation,
	useQuery,
	useQueryClient,
} from "@tanstack/react-query";
import { api } from "./axios";
import { TAX_RATE, type Cart } from "@/types/cart";

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
		onMutate: async (addToCartData) => {
			await queryClient.cancelQueries({ queryKey: ["cart"] });
			const previousCart = queryClient.getQueryData<Cart>(["cart"]);

			queryClient.setQueryData<Cart>(["cart"], (old) => {
				if (!old) return old;
				return {
					...old,
					itemCount: old.itemCount + addToCartData.quantity,
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

export function useUpdateCartQuantity() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: cartApi.updateQuantity,
		onMutate: async ({ itemId, quantity }) => {
			await queryClient.cancelQueries({ queryKey: ["cart"] });
			const previousCart = queryClient.getQueryData<Cart>(["cart"]);

			queryClient.setQueryData<Cart>(["cart"], (old) => {
				if (!old) return old;
				const updatedItems = old.cartItems.map((item) => {
					if (item.id === itemId) {
						const unitPrice = Number(item.total) / item.quantity;
						const newTotal = unitPrice * quantity;
						return {
							...item,
							quantity,
							total: newTotal.toFixed(2),
						};
					}
					return item;
				});
				const itemCount = updatedItems.reduce(
					(sum, item) => sum + item.quantity,
					0,
				);

				const subtotal = updatedItems.reduce(
					(sum, item) => sum + Number(item.total ?? 0),
					0,
				);

				const tax = subtotal * TAX_RATE;
				const total = subtotal + Number(old.deliveryCharge) + tax;

				return {
					...old,
					cartItems: updatedItems,
					itemCount: itemCount,
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

export function useRemoveItemFromCart() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: cartApi.removeItemFromCart,
		onMutate: async (itemId) => {
			await queryClient.cancelQueries({ queryKey: ["cart"] });
			const previousCart = queryClient.getQueryData<Cart>(["cart"]);

			queryClient.setQueryData<Cart>(["cart"], (old) => {
				if (!old) return old;
				const updatedItems = old.cartItems.filter((i) => i.id !== itemId);
				const removedItem = old.cartItems.find((i) => i.id === itemId);
				const subtotal = updatedItems.reduce(
					(sum, item) => sum + Number(item.total ?? 0),
					0,
				);
				const tax = subtotal * TAX_RATE;
				const total = subtotal + Number(old.deliveryCharge) + tax;
				return {
					...old,
					cartItems: updatedItems,
					itemCount: old.itemCount - (removedItem?.quantity ?? 0),
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
					itemCount: 0,
					cartItems: [],
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

export async function useMergeCart() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: cartApi.mergeGuestCart,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["cart"] });
		},
		onError: (err) => {
			console.error("Cart merge failed", err);
			queryClient.invalidateQueries({ queryKey: ["cart"] });
		},
	});
}
