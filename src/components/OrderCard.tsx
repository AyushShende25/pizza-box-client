import { MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
	Card,
	CardAction,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ORDER_STATUS, type Order } from "@/types/orders";

function OrderCard({ order }: { order: Order }) {
	return (
		<Card>
			<CardHeader>
				<CardTitle>Order {order?.order_no}</CardTitle>
				<CardDescription>
					{new Date(order.created_at).toLocaleDateString("en-US", {
						weekday: "long",
						year: "numeric",
						month: "long",
						day: "numeric",
					})}
				</CardDescription>
				<CardAction>
					<Badge
						variant={
							order.order_status === ORDER_STATUS.DELIVERED
								? "default"
								: order.order_status === ORDER_STATUS.CANCELLED
									? "destructive"
									: "secondary"
						}
						className="capitalize"
					>
						{order.order_status}
					</Badge>
				</CardAction>
			</CardHeader>
			<CardContent className="space-y-4">
				<div className="space-y-3">
					{order?.order_items?.map((item) => (
						<div
							key={item.id}
							className="flex justify-between items-center border rounded-lg p-3 bg-muted/30"
						>
							<div>
								<p className="font-medium capitalize">{item.pizza_name}</p>
								<p className="text-sm text-muted-foreground">
									Qty: {item.quantity} • {item.size_name} • {item.crust_name}
								</p>
								{item.toppings.length > 0 && (
									<p className="text-xs text-muted-foreground mt-1">
										+ {item.toppings.map((t) => t.topping_name).join(", ")}
									</p>
								)}
							</div>
							<p className="font-semibold text-sm text-right">
								₹{item.total_price}
							</p>
						</div>
					))}
				</div>

				<Separator />

				{/* Delivery Info */}
				<div className="text-muted-foreground space-y-1">
					<div className="flex gap-2 items-start">
						<MapPin className="size-4 mt-[2px]" />
						<p className="text-sm leading-snug whitespace-pre-line">
							{order.delivery_address}
						</p>
					</div>
				</div>

				<Separator />

				{/* Totals */}
				<div className="text-right space-y-1">
					<p className="text-sm text-muted-foreground">Tax: ₹{order.tax}</p>
					<p className="text-sm text-muted-foreground">
						Delivery: ₹{order.delivery_charge}
					</p>
					<p className="text-base font-semibold">Total: ₹{order.total}</p>
				</div>
			</CardContent>
		</Card>
	);
}
export default OrderCard;
