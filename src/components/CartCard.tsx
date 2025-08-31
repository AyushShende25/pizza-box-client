import { Minus, Plus, Trash2 } from "lucide-react";
import MargheritaImg from "@/assets/margherita.png";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

function CartCard() {
	return (
		<Card className=" relative lg:flex-row lg:items-start gap-6 p-4">
			<div className="w-24 h-24 flex-shrink-0 overflow-hidden rounded-lg">
				<img
					className="w-full h-full object-cover"
					src={MargheritaImg}
					alt="Margherita Pizza"
				/>
			</div>
			<CardContent className="space-y-3 flex-1 p-0">
				<div className="flex justify-between items-start">
					<h4 className="text-xl font-semibold">Margherita Supreme</h4>
					<Button
						size="icon"
						variant="ghost"
						className="text-muted-foreground hover:text-destructive"
					>
						<Trash2 />
					</Button>
				</div>
				<div className="text-sm text-muted-foreground">
					Fresh mozzarella, San Marzano tomatoes, basil
				</div>
				<div className="flex gap-2 flex-wrap">
					<Badge>Thin Crust</Badge>
					<Badge>Medium</Badge>
				</div>
				<div className="flex justify-between items-center">
					<div className="flex gap-3 items-center">
						<Button variant={"outline"} size="icon">
							<Minus />
						</Button>
						<p>3</p>
						<Button variant={"outline"} size="icon">
							<Plus />
						</Button>
					</div>
					<p className="text-primary text-xl font-semibold ">$20</p>
				</div>
			</CardContent>
		</Card>
	);
}
export default CartCard;
