import type { Order, OrderStatus, PaymentStatus } from "@/types/orders";
import { api } from "./axios";
import { infiniteQueryOptions } from "@tanstack/react-query";

type FetchOrdersProps = {
	page?: number;
	limit?: number;
	orderStatus?: OrderStatus;
	paymentStatus?: PaymentStatus;
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
		if (orderStatus) params.append("order_status", orderStatus);
		if (paymentStatus) params.append("payment_status", paymentStatus);
		const res = await api.get(`/orders/my-orders?${params.toString()}`);
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
