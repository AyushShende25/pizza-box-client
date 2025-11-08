import type { Crust } from "./crust";
import type { Pizza } from "./pizza";
import type { Size } from "./size";
import type { Topping } from "./topping";

export type CartItem = {
	id: string;
	quantity: number;
	total: string;
	pizza: Pizza;
	size: Size;
	crust: Crust;
	toppings: Topping[];
	createdAt: string;
	updatedAt: string;
};

export type Cart = {
	id: string;
	subtotal: string;
	tax: string;
	deliveryCharge: string;
	total: string;
	cartItems: CartItem[];
	createdAt: string;
	updatedAt: string;
	itemCount: number;
};

export const TAX_RATE = 0.18;
