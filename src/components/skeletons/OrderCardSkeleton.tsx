import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";

export function OrderCardSkeleton() {
	return (
		<Card className="animate-pulse">
			{/* Header */}
			<CardHeader className="flex flex-row items-start justify-between space-y-0">
				<div className="space-y-1">
					<Skeleton className="h-5 w-32" />
					<Skeleton className="h-4 w-24" />
				</div>
				<Skeleton className="h-6 w-16 rounded-full" />
			</CardHeader>

			{/* Content */}
			<CardContent className="space-y-4">
				{/* Item 1 */}
				<div className="flex justify-between items-center">
					<div className="flex gap-3 flex-1">
						<Skeleton className="w-10 h-10 rounded-lg" />
						<div className="space-y-2">
							<Skeleton className="h-4 w-24" />
							<Skeleton className="h-3 w-16" />
						</div>
					</div>
					<Skeleton className="h-4 w-8" />
				</div>

				<Separator />

				{/* Address section */}
				<div className="space-y-2">
					<div className="flex items-center gap-2">
						<Skeleton className="h-5 w-5 rounded-full" />
						<Skeleton className="h-4 w-48" />
					</div>
					<div className="flex items-center gap-2">
						<Skeleton className="h-5 w-5 rounded-full" />
						<Skeleton className="h-4 w-36" />
					</div>
				</div>

				<Separator />

				{/* Total */}
				<div className="flex justify-end">
					<Skeleton className="h-5 w-20" />
				</div>
			</CardContent>
		</Card>
	);
}
