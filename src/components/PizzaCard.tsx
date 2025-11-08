import { ShoppingCart, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import type { Pizza } from "@/types/pizza";
import PizzaOptionsModal from "@/components/PizzaOptionsModal";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";

function PizzaCard({ pizza }: { pizza: Pizza }) {
	if (!pizza) {
		return <p>No Pizza</p>;
	}

	return (
		<Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 ">
			<CardHeader className="relative">
				{pizza.category === "veg" ? (
					<Badge className="absolute right-4 top-0 bg-green-500">veg</Badge>
				) : (
					<Badge variant="destructive" className="absolute right-4 top-0">
						non-veg
					</Badge>
				)}

				<div className="max-w-2/3 mx-auto mb-2">
					<img
						className="w-full object-cover"
						src={pizza.imageUrl}
						alt={pizza.name}
					/>
				</div>
				<CardTitle>{pizza.name}</CardTitle>
				<CardDescription>{pizza.description}</CardDescription>
			</CardHeader>
			<CardContent className="space-y-4">
				<div className="flex items-center justify-between">
					<div className="flex items-center space-x-1">
						<Star className="w-4 h-4 fill-primary text-primary" />
						<span className="text-sm font-medium">{4.5}</span>
						<span className="text-xs text-muted-foreground">
							(120+ reviews)
						</span>
					</div>
					<span className="text-2xl font-light text-primary">
						₹{pizza.basePrice}
					</span>
				</div>
				<div>
					<Sheet>
						<SheetTrigger asChild>
							<Button className="w-full cursor-pointer">
								<ShoppingCart />
								<span>Add to Cart</span>
							</Button>
						</SheetTrigger>
						<PizzaOptionsModal pizza={pizza} />
					</Sheet>
				</div>
			</CardContent>
		</Card>
	);
}
export default PizzaCard;
