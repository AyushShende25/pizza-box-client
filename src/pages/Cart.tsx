import { CreditCard, DollarSign, Trash2 } from "lucide-react";
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
import { useClearCart, useFetchCart } from "@/api/cartApi";
import { CartCardSkeleton } from "@/components/skeletons/CartCardSkeleton";
import { OrderSummarySkeleton } from "@/components/skeletons/OrderSummarySkeleton";
import emptyCart from "@/assets/empty_cart.svg";
import { Link } from "react-router";
function Cart() {
	const { data, isPending: cartLoading } = useFetchCart();
	const { mutate: clearCartMutation, isPending } = useClearCart();

	if (!cartLoading && data?.cart_items && data.cart_items.length < 1) {
		return (
			<div className="flex flex-col items-center justify-center py-10 md:py-16 gap-10">
				<div className="flex flex-col items-center justify-center gap-4">
					<h3 className="text-4xl md:text-5xl font-medium">
						Your cart is Empty
					</h3>
					<Link to={"/menu"}>
						<Button>Explore our menu</Button>
					</Link>
				</div>
				<div className="max-w-md">
					<img src={emptyCart} alt="empty-cart" />
				</div>
			</div>
		);
	}
	return (
		<section className="px-6 md:px-10 py-8 md:py-16 space-y-8">
			<h1 className="text-3xl lg:text-4xl font-bold tracking-tight">
				Cart Items
			</h1>

			<div className="grid md:grid-cols-2 gap-12 lg:grid-cols-5 justify-center">
				{/* Cart Cards */}
				<div className="lg:col-span-3 space-y-6">
					{cartLoading
						? [...Array(8)].map((_, i) => <CartCardSkeleton key={i} />)
						: data?.cart_items.map((item) => (
								<CartCard key={item.id} cartItem={item} />
							))}
					<div className="hidden md:block text-center">
						<Button
							variant="outline"
							className="cursor-pointer w-full"
							onClick={() => clearCartMutation()}
							disabled={isPending}
						>
							<Trash2 /> <span>Clear Cart</span>
						</Button>
					</div>
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
							{cartLoading ? (
								<OrderSummarySkeleton />
							) : (
								<div className="space-y-3">
									<div className="flex justify-between">
										<p>Subtotal</p>
										<p>₹{data?.subtotal}</p>
									</div>
									<div className="flex justify-between">
										<p>Delivery fee</p>
										<p>₹{data?.delivery_charge}</p>
									</div>
									<div className="flex justify-between">
										<p>Tax</p>
										<p>₹{data?.tax}</p>
									</div>
									<Separator />
									<div className="flex justify-between">
										<p className="text-lg font-semibold">Total</p>
										<p className="font-semibold text-lg text-primary">
											₹{data?.total}
										</p>
									</div>
								</div>
							)}

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
								<span className="text-lg">₹{data?.total}</span>
							</Button>
						</CardContent>
						<CardFooter>
							<p className="text-xs font-light text-muted-foreground mx-auto">
								By placing this order, you agree to our Terms & Conditions
							</p>
						</CardFooter>
					</Card>
				</div>
				<div className="-mt-4 md:hidden">
					<Button variant="outline" className="cursor-pointer w-full">
						<Trash2 /> <span>Clear Cart</span>
					</Button>
				</div>
			</div>
		</section>
	);
}
export default Cart;
