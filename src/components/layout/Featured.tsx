import { Link } from "react-router";
import MargheritaImg from "@/assets/margherita.png";
import PizzaCard from "@/components/PizzaCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const featuredPizzas = [
	{
		id: 1,
		name: "Margherita Supreme",
		description:
			"Fresh mozzarella, San Marzano tomatoes, basil, extra virgin olive oil",
		price: 18.99,
		rating: 4.8,
		image: MargheritaImg,
		category: "veg",
	},
	{
		id: 2,
		name: "Pepperoni Classic",
		description: "Premium pepperoni, mozzarella cheese, signature tomato sauce",
		price: 21.99,
		rating: 4.9,
		image: MargheritaImg,
		category: "veg",
	},
	{
		id: 3,
		name: "Truffle Deluxe",
		description: "Black truffle, wild mushrooms, ricotta, arugula, truffle oil",
		price: 28.99,
		rating: 4.7,
		image: MargheritaImg,
		category: "veg",
	},
	{
		id: 3,
		name: "Truffle Deluxe",
		description: "Black truffle, wild mushrooms, ricotta, arugula, truffle oil",
		price: 28.99,
		rating: 4.7,
		image: MargheritaImg,
		category: "veg",
	},
];

function Featured() {
	return (
		<section className="text-center px-6 md:px-10 py-8 md:py-16 space-y-8">
			<div className="space-y-4">
				<Badge variant="destructive">Our Specialties</Badge>
				<h2 className="text-4xl md:text-5xl font-bold leading-tight -mt-2">
					Our <span className="text-primary">Signature</span> Pizzas
				</h2>
				<p className="text-muted-foreground max-w-2xl mx-auto">
					Handcrafted with love using traditional Italian recipes and the finest
					ingredients
				</p>
			</div>

			<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
				{featuredPizzas.map((pizza) => (
					<PizzaCard key={pizza.id} />
				))}
			</div>
			<Link to="/menu">
				<Button
					variant={"outline"}
					className="text-primary border-primary hover:bg-primary hover:text-white"
					size="lg"
				>
					View Full Menu
				</Button>
			</Link>
		</section>
	);
}
export default Featured;
