import type { Order, OrderStatus, PaymentStatus } from "@/types/orders";
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
};

export const ordersApi = {
	fetchMyOrders: async ({
		page,
		limit,
		paymentStatus,
		orderStatus,
	}: FetchOrdersProps = {}): Promise<Order[]> => {
		const params = new URLSearchParams();
		if (page) params.append("page", String(page));
		if (limit) params.append("limit", String(limit));
		if (orderStatus) params.append("orderStatus", orderStatus);
		if (paymentStatus) params.append("paymentStatus", paymentStatus);
		const res = await api.get(`/orders/my-orders?${params.toString()}`);
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
