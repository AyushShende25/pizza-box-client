import type { Topping, ToppingCategory } from "@/types/topping";
import { api } from "./axios";
import { queryOptions, useQuery } from "@tanstack/react-query";
import type { FoodType } from "@/types/pizza";

type FetchToppingsProps = {
	category?: ToppingCategory;
	foodType?: FoodType;
	isAvailable?: boolean;
};

export const toppingsApi = {
	fetchAllToppings: async (
		fetchToppingsProps: FetchToppingsProps = {},
	): Promise<Topping[]> => {
		const res = await api.get("/menu/toppings", {
			params: {
				...fetchToppingsProps,
				isAvailable: true,
			},
		});
		return res.data;
	},
};

export const fetchToppingsQueryOptions = () =>
	queryOptions({
		queryKey: ["toppings"],
		queryFn: () => toppingsApi.fetchAllToppings(),
		staleTime: Number.POSITIVE_INFINITY,
	});

export function useFetchToppings() {
	return useQuery(fetchToppingsQueryOptions());
}
