import type {
	Order,
	OrderStatus,
	PaymentMethod,
	PaymentStatus,
} from "@/types/orders";
import { api } from "./axios";
import {
	infiniteQueryOptions,
	useMutation,
	useQueryClient,
} from "@tanstack/react-query";

type FetchOrdersProps = {
	page?: number;
	limit?: number;
	orderStatus?: OrderStatus;
	paymentStatus?: PaymentStatus;
};

type OrderCreate = {
	addressId: string;
	notes?: string;
	orderItems: {
		quantity: number;
		pizzaId: string;
		sizeId: string;
		crustId: string;
		toppingsIds: string[];
	}[];
	paymentMethod: PaymentMethod;
};

export const ordersApi = {
	fetchMyOrders: async (
		fetchOrderParams: FetchOrdersProps = {},
	): Promise<Order[]> => {
		const res = await api.get("/orders/my-orders", {
			params: fetchOrderParams,
		});
		return res.data;
	},
	createNewOrder: async (orderCreate: OrderCreate): Promise<Order> => {
		const res = await api.post("/orders", orderCreate);
		return res.data;
	},
};

export const fetchMyOrdersQueryOptions = (
	fetchOrdersProps?: FetchOrdersProps,
) =>
	infiniteQueryOptions({
		queryKey: ["orders", fetchOrdersProps ?? {}],
		queryFn: ({ pageParam }) =>
			ordersApi.fetchMyOrders({ ...fetchOrdersProps, page: pageParam }),
		staleTime: Number.POSITIVE_INFINITY,
		initialPageParam: 1,
		getNextPageParam: (lastPage, _allPages, lastPageParam) => {
			return lastPage.length > 0 ? lastPageParam + 1 : undefined;
		},
	});

export const useCreateOrder = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: ordersApi.createNewOrder,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["orders"] });
		},
	});
};
