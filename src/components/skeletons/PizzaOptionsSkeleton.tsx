import { Skeleton } from "@/components/ui/skeleton";
import {
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
} from "@/components/ui/sheet";

function PizzaOptionsSkeleton() {
	return (
		<SheetContent className="px-4 overflow-y-scroll">
			<SheetHeader>
				<SheetTitle>Customize Your Pizza 🍕</SheetTitle>
				<SheetDescription>Loading options...</SheetDescription>
				<div className="pt-2 space-y-2">
					<Skeleton className="h-6 w-40" />
					<Skeleton className="h-4 w-64" />
				</div>
			</SheetHeader>

			{/* Default Toppings */}
			<div className="space-y-3 mt-4">
				<Skeleton className="h-4 w-32" />
				<div className="flex flex-wrap gap-2">
					<Skeleton className="h-6 w-16 rounded-full" />
					<Skeleton className="h-6 w-20 rounded-full" />
					<Skeleton className="h-6 w-14 rounded-full" />
				</div>
			</div>

			<div className="space-y-3 mt-4">
				<Skeleton className="h-4 w-24" />
				<div className="space-y-2">
					<Skeleton className="h-12 w-full rounded-md" />
					<Skeleton className="h-12 w-full rounded-md" />
				</div>
			</div>
		</SheetContent>
	);
}

export default PizzaOptionsSkeleton;
