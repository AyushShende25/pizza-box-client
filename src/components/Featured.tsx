import { Link } from "react-router";
import PizzaCard from "@/components/PizzaCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { fetchfeaturedPizzasQueryOptions } from "@/api/pizzasApi";
import PizzaCardSkeleton from "./skeletons/PizzaCardSkeleton";

function Featured() {
	const { data, isPending } = useQuery(fetchfeaturedPizzasQueryOptions());

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
				{isPending
					? [...Array(4)].map((_, i) => <PizzaCardSkeleton key={i} />)
					: data?.items
							.slice(0, 4)
							.map((pizza) => <PizzaCard key={pizza.id} pizza={pizza} />)}
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
