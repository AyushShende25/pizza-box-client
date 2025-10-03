import { queryOptions, useQuery } from "@tanstack/react-query";
import { api } from "./axios";
import type { Crust } from "@/types/crust";

export const crustsApi = {
	fetchAllCrusts: async (): Promise<Crust[]> => {
		const res = await api.get("/menu/crusts?available_only=true");
		return res.data;
	},
};

export const fetchCrustsQueryOptions = () =>
	queryOptions({
		queryKey: ["crusts"],
		queryFn: () => crustsApi.fetchAllCrusts(),
		staleTime: Number.POSITIVE_INFINITY,
	});

export function useFetchCrusts() {
	return useQuery(fetchCrustsQueryOptions());
}
