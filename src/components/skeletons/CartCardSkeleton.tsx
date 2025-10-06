import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function CartCardSkeleton() {
	return (
		<Card className="relative lg:flex-row lg:items-start gap-6 p-4">
			{/* Image placeholder */}
			<div className="w-24 h-24 flex-shrink-0 overflow-hidden rounded-lg">
				<Skeleton className="w-full h-full" />
			</div>

			<CardContent className="space-y-3 flex-1 p-0">
				{/* Header (title + delete button) */}
				<div className="flex justify-between items-start">
					<Skeleton className="h-6 w-40" />
					<Skeleton className="h-5 w-5 rounded-full" />
				</div>

				{/* Description */}
				<Skeleton className="h-4 w-3/4" />

				{/* Badges */}
				<div className="flex gap-2 flex-wrap">
					<Skeleton className="h-5 w-14 rounded-full" />
					<Skeleton className="h-5 w-14 rounded-full" />
				</div>

				{/* Quantity controls + price */}
				<div className="flex justify-between items-center">
					<div className="flex gap-3 items-center">
						<Skeleton className="h-9 w-9 rounded-md" />
						<Skeleton className="h-4 w-5" />
						<Skeleton className="h-9 w-9 rounded-md" />
					</div>
					<Skeleton className="h-6 w-16" />
				</div>
			</CardContent>
		</Card>
	);
}
