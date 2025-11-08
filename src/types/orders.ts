export const ORDER_STATUS = {
	PENDING: "pending",
	CONFIRMED: "confirmed",
	PREPARING: "preparing",
	OUT_FOR_DELIVERY: "out_for_delivery",
	DELIVERED: "delivered",
	CANCELLED: "cancelled",
} as const;

export type OrderStatus = (typeof ORDER_STATUS)[keyof typeof ORDER_STATUS];

export const PAYMENT_STATUS = {
	PENDING: "pending",
	PAID: "paid",
	FAILED: "failed",
} as const;

export type PaymentStatus =
	(typeof PAYMENT_STATUS)[keyof typeof PAYMENT_STATUS];

export const PAYMENT_METHOD = {
	COD: "cod",
	CARD: "card",
	UPI: "upi",
} as const;

export type PaymentMethod =
	(typeof PAYMENT_METHOD)[keyof typeof PAYMENT_METHOD];

type OrderItem = {
	quantity: number;
	id: string;
	toppings: {
		id: string;
		toppingName: string;
		toppingPrice: string;
	}[];
	pizzaName: string;
	sizeName: string;
	crustName: string;
	sizePrice: string;
	crustPrice: string;
	basePizzaPrice: string;
	toppingsTotalPrice: string;
	unitPrice: string;
	totalPrice: string;
};

export type Order = {
	paymentMethod: PaymentMethod;
	notes?: string;
	id: string;
	orderNo: string;
	orderItems: OrderItem[];
	userId: string;
	orderStatus: OrderStatus;
	paymentStatus: PaymentStatus;
	subtotal: string;
	tax: string;
	deliveryCharge: string;
	total: string;
	deliveryAddress: string;
	createdAt: string;
	updatedAt: string;
};
