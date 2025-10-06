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
	created_at: string;
	updated_at: string;
};

export type Cart = {
	id: string;
	subtotal: string;
	tax: string;
	delivery_charge: string;
	total: string;
	cart_items: CartItem[];
	created_at: string;
	updated_at: string;
	item_count: number;
};

export const TAX_RATE = 0.18;
