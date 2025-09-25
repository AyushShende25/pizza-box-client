import { fetchPizzasQueryOptions } from "@/api/pizzasApi";
import PizzaCard from "@/components/PizzaCard";
import PizzaCardSkeleton from "@/components/skeletons/PizzaCardSkeleton";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

function Menu() {
	const { ref, inView } = useInView();

	const { data, isFetchingNextPage, hasNextPage, fetchNextPage, isPending } =
		useInfiniteQuery(fetchPizzasQueryOptions());

	useEffect(() => {
		if (inView && hasNextPage && !isFetchingNextPage) {
			fetchNextPage();
		}
	}, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

	return (
		<section className="px-6 md:px-10 py-8 md:py-16 space-y-14">
			<div className="text-center space-y-4 max-w-2xl mx-auto">
				<h1 className="text-4xl md:text-5xl font-bold leading-tight tracking-tight text-balance">
					Authentic Italian <span className="text-primary">Menu</span>
				</h1>
				<p className="text-lg text-muted-foreground">
					Fresh ingredients, traditional recipes, and passionate craftsmanship
					in every bite.
				</p>
			</div>

			<Card>
				<CardContent className="flex flex-col md:flex-row gap-8 justify-between items-center">
					<RadioGroup defaultValue="option-one">
						<h4 className="">Dietery Preference</h4>
						<div className="flex gap-4">
							<div className="flex items-center space-x-2">
								<RadioGroupItem value="veg" id="option-one" />
								<Label htmlFor="option-one">Vegeterian Only</Label>
							</div>
							<div className="flex items-center space-x-2">
								<RadioGroupItem value="non_veg" id="option-two" />
								<Label htmlFor="option-two">Non-Vegeterian</Label>
							</div>
						</div>
					</RadioGroup>
					<Select>
						<SelectTrigger className="w-full md:max-w-xs lg:max-w-md">
							<SelectValue placeholder="sort" />
						</SelectTrigger>
						<SelectContent>
							<SelectGroup>
								<SelectLabel>Sort By</SelectLabel>
								<SelectItem value="price_low_high">
									Price: Low to High
								</SelectItem>
								<SelectItem value="price_high_low">
									Price: High to Low
								</SelectItem>
								<SelectItem value="popular">Most Popular</SelectItem>
							</SelectGroup>
						</SelectContent>
					</Select>
				</CardContent>
			</Card>

			<div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 lg:gap-10">
				{isPending
					? [...Array(8)].map((_, i) => <PizzaCardSkeleton key={i} />)
					: data?.pages.flatMap((page) =>
							page.items.map((pizza) => (
								<PizzaCard key={pizza.id} pizza={pizza} />
							)),
						)}
			</div>
			<div ref={ref} />

			<p className="bg-muted my-4 py-4 rounded-lg text-center font-semibold">
				{isFetchingNextPage
					? "Loading more..."
					: hasNextPage
						? "Load Newer"
						: "Nothing more to load"}
			</p>
		</section>
	);
}
export default Menu;
