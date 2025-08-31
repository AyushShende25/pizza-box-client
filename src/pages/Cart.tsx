import { CreditCard, DollarSign } from "lucide-react";
import CartCard from "@/components/CartCard";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

function Cart() {
	return (
		<section className="px-6 md:px-10 py-8 md:py-16 space-y-8">
			<h1 className="text-3xl lg:text-4xl font-bold tracking-tight">
				Cart Items
			</h1>
			<div className="grid md:grid-cols-2 gap-12 lg:grid-cols-5">
				{/* Cart Cards */}
				<div className="lg:col-span-3 space-y-6">
					<CartCard />
					<CartCard />
					<CartCard />
					<CartCard />
					<CartCard />
				</div>

				{/* Billing */}
				<div className="lg:col-span-2">
					<Card>
						<CardHeader>
							<CardTitle className="text-2xl">Order Summary</CardTitle>
							<CardDescription>Review your order details</CardDescription>
						</CardHeader>

						<CardContent className="space-y-4">
							{/* Billing */}
							<div className="space-y-3">
								<div className="flex justify-between">
									<p>Subtotal</p>
									<p>$20</p>
								</div>
								<div className="flex justify-between">
									<p>Delivery fee</p>
									<p>$8</p>
								</div>
								<div className="flex justify-between">
									<p>Tax</p>
									<p>$2</p>
								</div>
								<Separator />
								<div className="flex justify-between">
									<p className="text-lg font-semibold">Total</p>
									<p className="font-semibold text-lg text-primary">$30</p>
								</div>
							</div>

							<Separator />

							{/* Delivery */}
							<div className="space-y-3">
								<h4 className="font-medium">Delivery Information</h4>
								<div>
									<Input placeholder="Full Name" />
								</div>
								<div>
									<Input placeholder="Phone Number" />
								</div>
								<div>
									<Input placeholder="Street Address" />
								</div>
								<div className="flex gap-3">
									<Input placeholder="City" />
									<Input placeholder="Zip Code" />
								</div>
							</div>

							<Separator />

							{/* Payment */}
							<div className="space-y-3">
								<h4 className="font-medium">Payment Method</h4>
								<Select>
									<SelectTrigger className="w-1/2">
										<SelectValue placeholder="payment" />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="card">
											<CreditCard />
											Credit/Debit card
										</SelectItem>
										<SelectItem value="cash">
											<DollarSign />
											Cash on delivery
										</SelectItem>
									</SelectContent>
								</Select>
							</div>

							<Button size="lg" className="w-full cursor-pointer">
								<span className="text-lg">Place Order -</span>
								<span className="text-lg">$30</span>
							</Button>
						</CardContent>
						<CardFooter>
							<p className="text-xs font-light text-muted-foreground mx-auto">
								By placing this order, you agree to our Terms & Conditions
							</p>
						</CardFooter>
					</Card>
				</div>
			</div>
		</section>
	);
}
export default Cart;
