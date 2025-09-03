const features = [
	{
		icon: "🍅",
		title: "Fresh Ingredients",
		description:
			"We source the finest San Marzano tomatoes, authentic mozzarella, and fresh herbs daily",
	},
	{
		icon: "🕐",
		title: "30-Min Delivery",
		description:
			"Hot, fresh pizza delivered to your door in 30 minutes or less, guaranteed",
	},
	{
		icon: "👨‍🍳",
		title: "Master Chefs",
		description:
			"Our Italian-trained pizzaiolos bring authentic techniques and passion to every pizza",
	},
	{
		icon: "🔥",
		title: "Wood-Fired Ovens",
		description:
			"Traditional brick ovens reaching 900°F for that perfect crispy crust and smoky flavor",
	},
];

function Features() {
	return (
		<section className="text-center px-6 md:px-10 py-8 md:py-16 space-y-8">
			<div className="space-y-4">
				<h2 className="text-4xl md:text-5xl font-bold leading-tight -mt-2">
					Why Choose <span className="text-primary">Pizza-Box's</span> Pizza?
				</h2>
				<p className="text-muted-foreground max-w-2xl mx-auto">
					Three generations of Italian tradition meets modern convenience
				</p>
			</div>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
				{features.map((feature, index) => (
					<div
						key={index}
						className="text-center p-6 rounded-lg hover:scale-110 hover:fade-in transition-all duration-300"
					>
						<div className="text-6xl mb-4">{feature.icon}</div>
						<h3 className="text-xl font-bold mb-3 text-foreground">
							{feature.title}
						</h3>
						<p className="text-muted-foreground leading-relaxed">
							{feature.description}
						</p>
					</div>
				))}
			</div>
			<div className="mt-20 bg-primary-foreground rounded-2xl p-8">
				<div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
					<div>
						<div className="text-3xl md:text-4xl font-bold  mb-2 text-primary">
							50K+
						</div>
						<div className="text-muted-foreground">Happy Customers</div>
					</div>
					<div>
						<div className="text-3xl md:text-4xl font-bold  mb-2 text-primary">
							25+
						</div>
						<div className="text-muted-foreground">Pizza Varieties</div>
					</div>
					<div>
						<div className="text-3xl md:text-4xl font-bold  mb-2 text-primary">
							15
						</div>
						<div className="text-muted-foreground">Years Experience</div>
					</div>
					<div>
						<div className="text-3xl md:text-4xl font-bold  mb-2 text-primary">
							4.9★
						</div>
						<div className="text-muted-foreground">Average Rating</div>
					</div>
				</div>
			</div>
		</section>
	);
}
export default Features;
