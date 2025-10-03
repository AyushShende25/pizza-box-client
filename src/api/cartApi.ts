import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "./axios";
import { useNavigate } from "react-router";

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
};

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
