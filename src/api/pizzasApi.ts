import { infiniteQueryOptions, queryOptions } from "@tanstack/react-query";
import { api } from "@/api/axios";
import type { Pizza, PizzaCategory } from "@/types/pizza";

type PizzaListResponse = {
	items: Pizza[];
	total: number;
	page: number;
	pages: number;
	limit: number;
};

type FetchPizzaProps = {
	page?: number;
	limit?: number;
	sortBy?: string;
	name?: string;
	category?: PizzaCategory;
	isAvailable?: boolean;
};

export const pizzasApi = {
	fetchAllPizzas: async ({
		limit,
		page,
		sortBy,
		category,
		name,
		isAvailable = true,
	}: FetchPizzaProps = {}): Promise<PizzaListResponse> => {
		const query = new URLSearchParams({
			...(limit && { limit: String(limit) }),
			...(page !== undefined && { page: String(page) }),
			...(sortBy && { sortBy }),
			...(category && { category }),
			...(name && { name }),
			...(isAvailable !== undefined && { isAvailable: String(isAvailable) }),
		});
		const res = await api.get(`/menu/pizzas?${query}`);
		return res.data;
	},
	fetchFeaturedPizzas: async (): Promise<PizzaListResponse> => {
		const res = await api.get("/menu/pizzas?featured=true");
		return res.data;
	},
};

export const fetchPizzasQueryOptions = (fetchPizzaProps?: FetchPizzaProps) =>
	infiniteQueryOptions({
		queryKey: ["pizzas", fetchPizzaProps ?? {}],
		queryFn: ({ pageParam }) =>
			pizzasApi.fetchAllPizzas({ ...fetchPizzaProps, page: pageParam }),
		staleTime: Number.POSITIVE_INFINITY,
		initialPageParam: 1,
		getNextPageParam: (lastPage) =>
			lastPage.page < lastPage.pages ? lastPage.page + 1 : undefined,
	});

export const fetchfeaturedPizzasQueryOptions = () =>
	queryOptions({
		queryKey: ["featured"],
		queryFn: pizzasApi.fetchFeaturedPizzas,
		staleTime: Number.POSITIVE_INFINITY,
	});
