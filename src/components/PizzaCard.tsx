import { ShoppingCart, Star } from "lucide-react";
import MargheritaImg from "@/assets/margherita.png";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

function PizzaCard() {
	return (
		<Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 ">
			<CardHeader className="relative">
				<Badge className="absolute right-4 top-0 bg-green-500">veg</Badge>
				<div className="max-w-2/3 mx-auto mb-2">
					<img className="w-full object-cover" src={MargheritaImg} alt="" />
				</div>
				<CardTitle>Margherita Supreme</CardTitle>
				<CardDescription>
					Fresh mozzarella, San Marzano tomatoes, basil, extra virgin olive oil
				</CardDescription>
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
					<span className="text-2xl font-bold text-primary">${12}</span>
				</div>
				<div>
					<Button className="w-full cursor-pointer">
						<ShoppingCart />
						<span>Add to Cart</span>
					</Button>
				</div>
			</CardContent>
		</Card>
	);
}
export default PizzaCard;
