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
				<CardTitle>Order {order?.orderNo}</CardTitle>
				<CardDescription>
					{new Date(order.createdAt).toLocaleDateString("en-US", {
						weekday: "long",
						year: "numeric",
						month: "long",
						day: "numeric",
					})}
				</CardDescription>
				<CardAction>
					<Badge
						variant={
							order.orderStatus === ORDER_STATUS.DELIVERED
								? "default"
								: order.orderStatus === ORDER_STATUS.CANCELLED
									? "destructive"
									: "secondary"
						}
						className="capitalize"
					>
						{order.orderStatus}
					</Badge>
				</CardAction>
			</CardHeader>
			<CardContent className="space-y-4">
				<div className="space-y-3">
					{order?.orderItems?.map((item) => (
						<div
							key={item.id}
							className="flex justify-between items-center border rounded-lg p-3 bg-muted/30"
						>
							<div>
								<p className="font-medium capitalize">{item.pizzaName}</p>
								<p className="text-sm text-muted-foreground">
									Qty: {item.quantity} • {item.sizeName} • {item.crustName}
								</p>
								{item.toppings.length > 0 && (
									<p className="text-xs text-muted-foreground mt-1">
										+ {item.toppings.map((t) => t.toppingName).join(", ")}
									</p>
								)}
							</div>
							<p className="font-semibold text-sm text-right">
								₹{item.totalPrice}
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
							{order.deliveryAddress}
						</p>
					</div>
				</div>

				<Separator />

				{/* Totals */}
				<div className="text-right space-y-1">
					<p className="text-sm text-muted-foreground">Tax: ₹{order.tax}</p>
					<p className="text-sm text-muted-foreground">
						Delivery: ₹{order.deliveryCharge}
					</p>
					<p className="text-base font-semibold">Total: ₹{order.total}</p>
				</div>
			</CardContent>
		</Card>
	);
}
export default OrderCard;
