import { Skeleton } from "@/components/ui/skeleton";

function PizzaCardSkeleton() {
	return (
		<div className="flex flex-col gap-3">
			<Skeleton className="h-48 w-full rounded-xl" />
			<div className="space-y-2">
				<Skeleton className="h-5 w-3/4" />
				<Skeleton className="h-4 w-1/2" />
			</div>
		</div>
	);
}

export default PizzaCardSkeleton;
