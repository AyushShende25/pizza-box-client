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
		topping_name: string;
		topping_price: string;
	}[];
	pizza_name: string;
	size_name: string;
	crust_name: string;
	size_price: string;
	crust_price: string;
	base_pizza_price: string;
	toppings_total_price: string;
	unit_price: string;
	total_price: string;
};

export type Order = {
	payment_method: PaymentMethod;
	notes?: string;
	id: string;
	order_no: string;
	order_items: OrderItem[];
	user_id: string;
	order_status: OrderStatus;
	payment_status: PaymentStatus;
	subtotal: string;
	tax: string;
	delivery_charge: string;
	total: string;
	delivery_address: string;
	created_at: string;
	updated_at: string;
};
