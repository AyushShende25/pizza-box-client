import type { Size } from "@/types/size";
import { api } from "./axios";
import { queryOptions, useQuery } from "@tanstack/react-query";

export const sizesApi = {
	fetchAllSizes: async (): Promise<Size[]> => {
		const res = await api.get("/menu/sizes?availableOnly=true");
		return res.data;
	},
};

export const fetchSizesQueryOptions = () =>
	queryOptions({
		queryKey: ["sizes"],
		queryFn: () => sizesApi.fetchAllSizes(),
		staleTime: Number.POSITIVE_INFINITY,
	});

export function useFetchSizes() {
	return useQuery(fetchSizesQueryOptions());
}
