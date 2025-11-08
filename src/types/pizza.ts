import type { Topping } from "./topping";

export type Pizza = {
	id: string;
	name: string;
	description: string;
	basePrice: string;
	imageUrl: string;
	isAvailable: boolean;
	category: PizzaCategory;
	featured: boolean;
	defaultToppings: Topping[];
	createdAt: string;
	updatedAt: string;
};

export const PIZZA_CATEGORY = {
	VEG: "veg",
	NONVEG: "non_veg",
} as const;

export type PizzaCategory =
	(typeof PIZZA_CATEGORY)[keyof typeof PIZZA_CATEGORY];
