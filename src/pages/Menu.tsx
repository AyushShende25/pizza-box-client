import { fetchPizzasQueryOptions } from "@/api/pizzasApi";
import PizzaCard from "@/components/PizzaCard";
import PizzaCardSkeleton from "@/components/skeletons/PizzaCardSkeleton";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
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
import useDebounce from "@/hooks/useDebounce";
import { PIZZA_CATEGORY, type PizzaCategory } from "@/types/pizza";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useSearchParams } from "react-router";

function Menu() {
	let [searchParams, setSearchParams] = useSearchParams();
	const debouncedSearchValue = useDebounce(searchParams.get("name") ?? "");
	const { ref, inView } = useInView();

	const { data, isFetchingNextPage, hasNextPage, fetchNextPage, isPending } =
		useInfiniteQuery(
			fetchPizzasQueryOptions({
				category: (searchParams.get("category") as PizzaCategory) ?? undefined,
				name: debouncedSearchValue,
				sortBy: searchParams.get("sort_by") ?? undefined,
			}),
		);

	useEffect(() => {
		if (inView && hasNextPage && !isFetchingNextPage) {
			fetchNextPage();
		}
	}, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

	const handleChange = (key: string, value: string) => {
		const params = new URLSearchParams(searchParams);
		if (value) {
			params.set(key, value);
		} else {
			params.delete(key);
		}

		setSearchParams(params);
	};

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
				<CardContent className="flex flex-col md:flex-row gap-6 md:gap-10 justify-between items-center">
					<RadioGroup
						className="flex-1"
						defaultValue={searchParams.get("category") ?? ""}
						onValueChange={(v) => handleChange("category", v)}
					>
						<h4 className="">Dietery Preference</h4>
						<div className="flex gap-4">
							<div className="flex items-center space-x-2">
								<RadioGroupItem value={PIZZA_CATEGORY.VEG} id="option-one" />
								<Label htmlFor="option-one">Vegeterian Only</Label>
							</div>
							<div className="flex items-center space-x-2">
								<RadioGroupItem value={PIZZA_CATEGORY.NONVEG} id="option-two" />
								<Label htmlFor="option-two">Non-Vegeterian</Label>
							</div>
						</div>
					</RadioGroup>
					<Input
						value={searchParams.get("name") ?? ""}
						onChange={(e) => handleChange("name", e.target.value)}
						className="flex-1"
						placeholder="search with pizza-name"
					/>
					<Select
						defaultValue={searchParams.get("sort_by") ?? ""}
						onValueChange={(v) => handleChange("sort_by", v)}
					>
						<SelectTrigger className="flex-1 w-full">
							<SelectValue placeholder="sort" />
						</SelectTrigger>
						<SelectContent>
							<SelectGroup>
								<SelectLabel>Sort By</SelectLabel>
								<SelectItem value="base_price:asc">
									Price: Low to High
								</SelectItem>
								<SelectItem value="base_price:desc">
									Price: High to Low
								</SelectItem>
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
