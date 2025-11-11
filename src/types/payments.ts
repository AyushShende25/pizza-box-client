export type CheckoutResponse = {
	success: boolean;
	payment: {
		id: string;
		amount: number;
		currency: string;
		razorpay_order_id: string;
	};
};
export type VerifyPaymentParams = {
	paymentId: string;
	razorpayOrderId: string;
	razorpayPaymentId: string;
	razorpaySignature: string;
};
