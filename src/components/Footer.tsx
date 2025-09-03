import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

function Footer() {
	return (
		<footer className="px-6 md:px-10 py-8 md:py-16 space-y-8 bg-[#1c1917] text-primary-foreground">
			<div className="grid grid-cols-1 md:grid-cols-4 gap-8">
				<div className="md:col-span-2 space-y-6">
					<h3 className="text-3xl font-semibold text-chart-5">Pizza Box</h3>
					<p className="max-w-sm tracking-wide">
						Authentic Italian pizza made with love and traditional recipes
						passed down through three generations. Fresh ingredients, wood-fired
						ovens, and fast delivery.
					</p>
					<div className="flex gap-4">
						<Button size="icon" variant={"ghost"}>
							<Facebook size={24} />
						</Button>
						<Button size="icon" variant={"ghost"}>
							<Twitter size={24} />
						</Button>
						<Button size="icon" variant={"ghost"}>
							<Instagram size={24} />
						</Button>
						<Button size="icon" variant={"ghost"}>
							<Linkedin size={24} />
						</Button>
					</div>
				</div>

				<div className="space-y-4">
					<h4 className="text-xl font-semibold text-chart-5">Contact Info</h4>
					<p className="text-sm">+91 724 192 16424</p>
					<p className="text-sm">doughlicious@email.com</p>
					<p className="text-sm">3000 Tony Street, Stark Tower, Asgard</p>
				</div>

				<div className="space-y-4">
					<h4 className="text-xl font-semibold text-chart-5">Opening Hours</h4>
					<p className="text-sm">Monday-Friday: 08:00-22:00</p>
					<p className="text-sm">Thursday: 08:00-16:00</p>
					<p className="text-sm">Saturday: 10:00-Till Midnight</p>
				</div>
			</div>

			{/* Copyright */}
			<div>
				<Separator />
				<p className="text-center text-sm font-thin pt-8">
					&#169; 2025 Pizza-Box. All Rights Reserved.
				</p>
			</div>
		</footer>
	);
}
export default Footer;
