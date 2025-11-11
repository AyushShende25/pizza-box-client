import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "./axios";
import type { CheckoutResponse, VerifyPaymentParams } from "@/types/payments";

export const paymentsApi = {
	checkout: async (orderId: string): Promise<CheckoutResponse> => {
		const res = await api.post(`/payments/checkout/${orderId}`);
		return res.data;
	},
	verifyPayment: async (verifyPaymentData: VerifyPaymentParams) => {
		const res = await api.post("/payments/verify", verifyPaymentData);
		return res.data;
	},
};

export function useCheckout() {
	return useMutation({
		mutationFn: paymentsApi.checkout,
	});
}

export function useVerifyPayment() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: paymentsApi.verifyPayment,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["orders"] });
		},
	});
}
