import { Card, CardContent } from "@/components/ui/card";

const testimonials = [
	{
		id: 1,
		name: "Sarah Johnson",
		rating: 5,
		review:
			"Absolutely amazing! The Margherita pizza was perfect - crispy crust, fresh basil, and delivered hot in just 25 minutes.",
		avatar: "https://xsgames.co/randomusers/avatar.php?g=female",
	},
	{
		id: 2,
		name: "Mike Chen",
		rating: 5,
		review:
			"Best pizza in the city! The wood-fired flavor really makes a difference. Been ordering weekly for months now.",
		avatar: "https://xsgames.co/randomusers/avatar.php?g=male",
	},
	{
		id: 3,
		name: "Emily Rodriguez",
		rating: 5,
		review:
			"Family-owned quality you can taste. The ingredients are so fresh and authentic. My kids love the pepperoni!",
		avatar: "https://xsgames.co/randomusers/avatar.php?g=female",
	},
];

function Testimonials() {
	return (
		<section className="text-center px-6 md:px-10 py-8 md:py-16 space-y-8">
			<div className="space-y-4">
				<h2 className="text-4xl md:text-5xl font-bold leading-tight -mt-2">
					What our <span className="text-primary">Customers</span> Say
				</h2>
				<p className="text-muted-foreground max-w-2xl mx-auto">
					Don't just take our word for it - hear from our satisfied customers
				</p>
			</div>
			<div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
				{testimonials.map((testimonial) => (
					<Card key={testimonial.id}>
						<CardContent className="p-4">
							<div className="flex items-center mb-4">
								<div className="mr-3 w-10 h-10 overflow-hidden">
									<img
										className="w-full object-cover rounded-full"
										src={testimonial.avatar}
										alt="user"
									/>
								</div>
								<div>
									<h4 className="font-semibold text-card-foreground">
										{testimonial.name}
									</h4>
									<div className="flex text-secondary text-sm">
										{"⭐".repeat(testimonial.rating)}
									</div>
								</div>
							</div>
							<blockquote className="text-muted-foreground leading-relaxed italic">
								"{testimonial.review}"
							</blockquote>
						</CardContent>
					</Card>
				))}
			</div>
			<div className="text-center mt-12">
				<div className="md:flex justify-center items-center gap-2 text-muted-foreground">
					<div className="flex justify-center  items-center gap-2">
						<span className="text-xl">⭐</span>
						<span className="font-semibold">4.9 out of 5 stars</span>
					</div>
					<span>from over 10,000 reviews</span>
				</div>
			</div>
		</section>
	);
}
export default Testimonials;
