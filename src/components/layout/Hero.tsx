import { Clock, Flame, Star, Truck } from "lucide-react";
import HeroImg from "@/assets/hero.png";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";

function Hero() {
	return (
		<section className="relative bg-gradient-to-r from-orange-100 to-orange-50 py-12 md:py-20">
			<div className="container mx-auto px-6 md:grid md:grid-cols-2 md:gap-12 items-center">
				{/* TEXT CONTENT */}
				<article className="flex flex-col justify-center gap-4">
					<Badge className="-mb-4" variant={"destructive"}>
						<Flame size={14} /> <span>Authentic Italian Recipes</span>
					</Badge>
					<h1 className="text-3xl md:text-6xl font-bold leading-tight">
						Artisan Pizza <span className="text-primary">Delivered Hot</span>
					</h1>
					<p className="text-muted-foreground max-w-md">
						Experience the perfect blend of traditional Italian flavors and
						modern convenience. Hand-tossed dough, premium ingredients,
						delivered to your doorstep in 30 minutes or less.
					</p>

					{/* BUTTONS */}
					<div className="flex flex-col sm:flex-row gap-4 mt-4">
						<Button
							size="lg"
							className="text-lg cursor-pointer hover:scale-105 transition-transform"
							aria-label="Order pizza now"
						>
							Order Now
						</Button>
						<Link to="/menu">
							<Button
								variant="outline"
								size="lg"
								className="text-lg cursor-pointer"
								aria-label="View our menu"
							>
								View Menu
							</Button>
						</Link>
					</div>

					{/* FEATURES */}
					<div className="flex flex-wrap gap-6 text-sm text-muted-foreground mt-6">
						<div className="flex items-center gap-2">
							<Clock className="w-4 h-4 text-primary" />
							<span>30 min delivery</span>
						</div>
						<div className="flex items-center gap-2">
							<Truck className="w-4 h-4 text-primary" />
							<span>Free delivery over $25</span>
						</div>
						<div className="flex items-center gap-2">
							<Star className="w-4 h-4 fill-primary text-primary" />
							<span>4.9/5 rating</span>
						</div>
					</div>
				</article>

				{/* IMAGE */}
				<div className="flex justify-center mt-8 md:mt-0">
					<img
						src={HeroImg}
						alt="Person enjoying pizza"
						width={700}
						height={700}
						loading="lazy"
						className="object-contain w-full max-w-md md:max-w-xl"
					/>
				</div>
			</div>
		</section>
	);
}

export default Hero;
