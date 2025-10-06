import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";

export function OrderSummarySkeleton() {
	return (
		<div className="space-y-3">
			{/* Subtotal */}
			<div className="flex justify-between">
				<Skeleton className="h-4 w-20" />
				<Skeleton className="h-4 w-12" />
			</div>

			{/* Delivery Fee */}
			<div className="flex justify-between">
				<Skeleton className="h-4 w-24" />
				<Skeleton className="h-4 w-12" />
			</div>

			{/* Tax */}
			<div className="flex justify-between">
				<Skeleton className="h-4 w-16" />
				<Skeleton className="h-4 w-12" />
			</div>

			<Separator />

			{/* Total */}
			<div className="flex justify-between items-center">
				<Skeleton className="h-5 w-20" />
				<Skeleton className="h-5 w-16" />
			</div>
		</div>
	);
}
