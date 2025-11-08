import { Minus, Plus, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { CartItem } from "@/types/cart";
import { useRemoveItemFromCart, useUpdateCartQuantity } from "@/api/cartApi";
import { useEffect, useState } from "react";
import useDebounce from "@/hooks/useDebounce";

function CartCard({
	cartItem: { pizza, size, crust, total, quantity, id, toppings },
}: {
	cartItem: CartItem;
}) {
	const [numItems, setNumItems] = useState(quantity);

	const removeItemMutation = useRemoveItemFromCart();
	const updateCartMutation = useUpdateCartQuantity();
	const debouncedQuantity = useDebounce(numItems);

	useEffect(() => {
		setNumItems(quantity);
	}, [quantity]);

	useEffect(() => {
		if (debouncedQuantity !== quantity) {
			updateCartMutation.mutateAsync({
				itemId: id,
				quantity: debouncedQuantity,
			});
		}
	}, [debouncedQuantity]);

	return (
		<Card className=" relative lg:flex-row lg:items-start gap-6 p-4">
			<div className="w-24 h-24 flex-shrink-0 overflow-hidden rounded-lg">
				<img
					className="w-full h-full object-cover"
					src={pizza.imageUrl}
					alt={pizza.name}
				/>
			</div>
			<CardContent className="space-y-3 flex-1 p-0">
				<div className="flex justify-between items-start">
					<h4 className="text-xl font-semibold">{pizza.name}</h4>
					<Button
						size="icon"
						variant="ghost"
						className="text-muted-foreground hover:text-destructive cursor-pointer"
						onClick={() => removeItemMutation.mutate(id)}
						disabled={removeItemMutation.isPending}
					>
						<Trash2 />
					</Button>
				</div>
				<div className="text-sm text-muted-foreground">{pizza.description}</div>
				<div className="flex gap-2 flex-wrap">
					<Badge variant={"secondary"}>{size.displayName}</Badge>
					<Badge variant={"secondary"}>{crust.name}</Badge>
				</div>
				<div className="flex gap-2 flex-wrap">
					{toppings?.map((topping) => (
						<Badge variant={"outline"} key={topping.id}>
							{topping.name}
						</Badge>
					))}
				</div>
				<div className="flex justify-between items-center">
					<div className="flex gap-3 items-center">
						<Button
							className="cursor-pointer"
							onClick={() => setNumItems((prev) => Math.max(1, prev - 1))}
							variant={"outline"}
							size="icon"
							disabled={numItems <= 1 || updateCartMutation.isPending}
						>
							<Minus />
						</Button>
						<span>{numItems}</span>
						<Button
							className="cursor-pointer"
							onClick={() => setNumItems((prev) => prev + 1)}
							variant={"outline"}
							size="icon"
							disabled={updateCartMutation.isPending}
						>
							<Plus />
						</Button>
					</div>
					<p className="text-primary text-xl font-semibold ">₹{total}</p>
				</div>
			</CardContent>
		</Card>
	);
}
export default CartCard;
