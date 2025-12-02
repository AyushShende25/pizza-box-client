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
import { ORDER_STATUS, PAYMENT_STATUS, type Order } from "@/types/orders";
import { cn } from "@/lib/utils";

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
				<CardAction className="space-y-2 flex flex-col sm:flex-row sm:flex-wrap sm:space-y-0 sm:space-x-2">
					<div className="flex items-center gap-1 flex-wrap">
						<span className="text-xs text-muted-foreground font-medium whitespace-nowrap">
							Order:
						</span>
						<Badge
							className={cn(
								"capitalize",
								order.orderStatus === ORDER_STATUS.PENDING &&
									"bg-yellow-100 text-yellow-800",
								order.orderStatus === ORDER_STATUS.CONFIRMED &&
									"bg-blue-100 text-blue-800",
								order.orderStatus === ORDER_STATUS.DELIVERED &&
									"bg-green-100 text-green-800",
								order.orderStatus === ORDER_STATUS.CANCELLED &&
									"bg-red-100 text-red-800",
							)}
						>
							{order.orderStatus}
						</Badge>
					</div>

					<div className="flex items-center gap-1 flex-wrap">
						<span className="text-xs text-muted-foreground font-medium whitespace-nowrap">
							Payment:
						</span>
						<Badge
							variant="outline"
							className={cn(
								"capitalize",
								order.paymentStatus === PAYMENT_STATUS.PENDING &&
									"border-yellow-500 text-yellow-700",
								order.paymentStatus === PAYMENT_STATUS.PAID &&
									"border-green-500 text-green-700",
								order.paymentStatus === PAYMENT_STATUS.FAILED &&
									"border-red-500 text-red-700",
							)}
						>
							{order.paymentStatus}
						</Badge>
						<span className="text-xs text-muted-foreground capitalize">
							({order.paymentMethod === "cod" ? "Cash on Delivery" : "Online"})
						</span>
					</div>
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
						<p className="text-sm leading-snug whitespace-pre-line break-words">
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
