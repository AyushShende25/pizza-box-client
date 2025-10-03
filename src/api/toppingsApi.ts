import type { Topping, ToppingCategory } from "@/types/topping";
import { api } from "./axios";
import { queryOptions, useQuery } from "@tanstack/react-query";

export const toppingsApi = {
	fetchAllToppings: async (
		toppingCategory?: ToppingCategory,
		vegetarianOnly?: boolean,
		isAvailable: boolean = true,
	): Promise<Topping[]> => {
		const res = await api.get("/menu/toppings", {
			params: {
				...(toppingCategory && { category: toppingCategory }),
				...(vegetarianOnly !== undefined && {
					vegetarian_only: vegetarianOnly,
				}),
				...(isAvailable !== undefined && {
					is_available: isAvailable,
				}),
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
