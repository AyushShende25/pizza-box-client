import PizzaCard from "@/components/PizzaCard";
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

function Menu() {
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
				{[...Array(10).keys()].map((item) => (
					<PizzaCard key={item} />
				))}
			</div>
		</section>
	);
}
export default Menu;
