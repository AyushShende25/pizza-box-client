import { MapPin, Phone } from "lucide-react";
import MargheritaImg from "@/assets/margherita.png";
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

function OrderCard() {
	return (
		<Card>
			<CardHeader>
				<CardTitle>Order #PZ001234</CardTitle>
				<CardDescription>July 25, 2025</CardDescription>
				<CardAction>
					<Badge>Ordered</Badge>
				</CardAction>
			</CardHeader>
			<CardContent className="space-y-4">
				<div className="flex justify-between items-center">
					{/* Left side */}
					<div className="flex gap-3 flex-1">
						<div className="w-10 h-10 rounded-lg overflow-hidden">
							<img
								src={MargheritaImg}
								className="w-full h-full object-cover"
								alt=""
							/>
						</div>
						<div>
							<p>Margherita</p>
							<p className="text-sm text-muted-foreground">Qty: 2</p>
						</div>
					</div>

					{/* Right side (price) */}
					<div className="font-semibold">$10</div>
				</div>
				<div className="flex justify-between items-center">
					{/* Left side */}
					<div className="flex gap-3 flex-1">
						<div className="w-10 h-10 rounded-lg overflow-hidden">
							<img
								src={MargheritaImg}
								className="w-full h-full object-cover"
								alt=""
							/>
						</div>
						<div>
							<p>Margherita</p>
							<p className="text-sm text-muted-foreground">Qty: 2</p>
						</div>
					</div>

					{/* Right side (price) */}
					<div className="font-semibold">$10</div>
				</div>
				<Separator />
				<div className="space-y-2 text-muted-foreground">
					<div className="flex gap-2 items-center">
						<MapPin className="w-5 h-5" />
						<span>123 Main St, New York, NY 10001</span>
					</div>
					<div className="flex gap-2 items-center">
						<Phone className="w-5 h-5" />
						<span>7354623144</span>
					</div>
				</div>
				<Separator />
				<div className="flex justify-end">
					<p className="text-lg font-semibold">Total: $20</p>
				</div>
			</CardContent>
		</Card>
	);
}
export default OrderCard;
