import {
	queryOptions,
	useMutation,
	useQuery,
	useQueryClient,
} from "@tanstack/react-query";
import { api } from "./axios";
import type { Address } from "@/types/address";
import type { CreateAddressInput } from "@/components/CreateAddressForm";

export const addressApi = {
	fetchAddresses: async (): Promise<Address[]> => {
		const res = await api.get("/addresses/");
		return res.data;
	},
	createAddress: async (addressData: CreateAddressInput) => {
		const res = await api.post("/addresses/", addressData);
		return res.data;
	},
	deleteAddress: async (addressId: string) => {
		await api.delete(`/addresses/${addressId}`);
	},
	updateDefaultAddress: async (addressId: string) => {
		const res = await api.patch(`/addresses/${addressId}`, {
			isDefault: true,
		});
		return res.data;
	},
};

export const fetchAddressesQueryOptions = () =>
	queryOptions({
		queryKey: ["addresses"],
		queryFn: addressApi.fetchAddresses,
		staleTime: Number.POSITIVE_INFINITY,
	});

export function useFetchAddresses() {
	return useQuery(fetchAddressesQueryOptions());
}

export function useCreateAddress() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: addressApi.createAddress,
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ["addresses"],
			});
		},
	});
}

export function useDeleteAddress() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: addressApi.deleteAddress,
		onMutate: async (addressId) => {
			await queryClient.cancelQueries({ queryKey: ["addresses"] });

			const previousAddresses = queryClient.getQueryData<Address[]>([
				"addresses",
			]);

			queryClient.setQueryData<Address[]>(["addresses"], (old) =>
				old?.filter((item) => item.id !== addressId),
			);

			return { previousAddresses };
		},
		onError: (_err, _variables, context) => {
			queryClient.setQueryData(["addresses"], context?.previousAddresses);
		},
		onSettled: () => {
			queryClient.invalidateQueries({
				queryKey: ["addresses"],
			});
		},
	});
}

export function useUpdateDefaultAddress() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: addressApi.updateDefaultAddress,
		onMutate: async (addressId) => {
			await queryClient.cancelQueries({ queryKey: ["addresses"] });

			const previousAddresses = queryClient.getQueryData<Address[]>([
				"addresses",
			]);

			queryClient.setQueryData<Address[]>(["addresses"], (old) => {
				if (!old) return old;
				return old.map((item) => ({
					...item,
					is_default: item.id === addressId,
				}));
			});

			return { previousAddresses };
		},
		onError: (_err, _variables, context) => {
			queryClient.setQueryData(["addresses"], context?.previousAddresses);
		},
		onSettled: () => {
			queryClient.invalidateQueries({
				queryKey: ["addresses"],
			});
		},
	});
}
