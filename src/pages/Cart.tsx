import { AlertCircle, Trash2 } from "lucide-react";
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
import { Separator } from "@/components/ui/separator";
import { useClearCart, useFetchCart } from "@/api/cartApi";
import { CartCardSkeleton } from "@/components/skeletons/CartCardSkeleton";
import { OrderSummarySkeleton } from "@/components/skeletons/OrderSummarySkeleton";
import emptyCart from "@/assets/empty_cart.svg";
import { Link, useNavigate } from "react-router";
import { useFetchAddresses } from "@/api/addressApi";
import { useEffect, useMemo, useState } from "react";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import CreateAddressForm from "@/components/CreateAddressForm";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useMe } from "@/api/authApi";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { useCreateOrder } from "@/api/ordersApi";
import AddressDisplay from "@/components/AddressDisplay";
import { useCheckout, useVerifyPayment } from "@/api/paymentsApi";
import { loadRazorpay } from "@/lib/razorpay";
import { toast } from "sonner";
import { PAYMENT_METHOD, type PaymentMethod } from "@/types/orders";

function Cart() {
	const { data: cart, isPending: cartLoading } = useFetchCart();
	const clearCartMutation = useClearCart();
	const createOrderMutation = useCreateOrder();
	const checkoutPaymentMutation = useCheckout();
	const verifyPaymentMutation = useVerifyPayment();
	const { data: addresses, isPending: addressesLoading } = useFetchAddresses();
	const { data: user, isPending: userPending } = useMe();
	const [notes, setNotes] = useState<string>("");
	const navigate = useNavigate();

	const defaultAddress = useMemo(
		() => addresses?.find((addr) => addr.isDefault === true),
		[addresses],
	);
	const [selectedAddressId, setSelectedAddressId] = useState<string | null>(
		null,
	);

	const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>(
		PAYMENT_METHOD.DIGITAL,
	);

	useEffect(() => {
		loadRazorpay();
	}, []);

	useEffect(() => {
		if (defaultAddress?.id && !selectedAddressId) {
			setSelectedAddressId(defaultAddress.id);
		}
	}, [defaultAddress, selectedAddressId]);

	const selectedAddress = useMemo(
		() => addresses?.find((addr) => addr.id === selectedAddressId),
		[addresses, selectedAddressId],
	);
	const cartItemCount = cart?.itemCount ?? 0;
	const canPlaceOrder =
		cartItemCount > 0 &&
		selectedAddressId &&
		!cartLoading &&
		!createOrderMutation.isPending;

	const handleCheckout = async () => {
		if (!selectedAddressId || !cart) return;

		const orderItems = cart.cartItems.map((item) => ({
			quantity: item.quantity,
			pizzaId: item.pizza.id,
			sizeId: item.size.id,
			crustId: item.crust.id,
			toppingsIds: item.toppings.map((t) => t.id),
		}));

		try {
			const order = await createOrderMutation.mutateAsync({
				orderItems,
				addressId: selectedAddressId,
				notes,
				paymentMethod,
			});

			if (paymentMethod === PAYMENT_METHOD.COD) {
				toast.success("Order placed successfully. Pay on delivery.");
				await clearCartMutation.mutateAsync();
				navigate("/orders", { replace: true });
				return;
			}

			await handleRazorpayCheckout(order.id, order.orderNo);
		} catch (err) {
			console.error("Checkout failed:", err);
			toast.error("Failed to initiate checkout. Please try again.");
		}
	};

	const handleRazorpayCheckout = async (orderId: string, orderNo: string) => {
		const razorpayKey = import.meta.env.VITE_PUBLIC_RAZORPAY_KEY_ID;
		if (!razorpayKey) {
			toast.error("Payment configuration error. Please contact support.");
			return;
		}

		const isLoaded = await loadRazorpay();
		if (!isLoaded) {
			toast.error(
				"Payment system failed to load. Please check your connection and try again.",
			);
			return;
		}

		try {
			const { payment } = await checkoutPaymentMutation.mutateAsync(orderId);

			const options = {
				key: razorpayKey,
				amount: payment.amount * 100,
				currency: payment.currency,
				order_id: payment.razorpay_order_id,
				name: "Pizza-Box",
				description: `Order ${orderNo}`,
				handler: async (response: any) => {
					try {
						toast.loading("Verifying payment...");

						const {
							razorpay_payment_id,
							razorpay_order_id,
							razorpay_signature,
						} = response;

						const verifyRes = await verifyPaymentMutation.mutateAsync({
							paymentId: payment.id,
							razorpayOrderId: razorpay_order_id,
							razorpaySignature: razorpay_signature,
							razorpayPaymentId: razorpay_payment_id,
						});

						if (verifyRes.success) {
							toast.dismiss();
							toast.success("Payment successful!");
							await clearCartMutation.mutateAsync();
							navigate("/orders", { replace: true });
						} else {
							toast.dismiss();
							toast.error(
								"Payment verification failed. Please contact support.",
							);
							navigate("/orders");
						}
					} catch (err) {
						toast.dismiss();
						console.error("Payment verification error:", err);
						toast.error("Payment verification failed. Please contact support.");
						navigate("/orders");
					}
				},
				prefill: {
					name: user?.firstName ?? "",
					email: user?.email ?? "",
					contact: selectedAddress?.phoneNumber ?? "",
				},
				theme: { color: "#F37254" },
			};

			new (window as any).Razorpay(options).open();
		} catch (err) {
			console.error("Razorpay checkout failed:", err);
			toast.error("Unable to start payment. Please try again.");
		}
	};

	if (!cartLoading && !cart?.cartItems?.length) {
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
					<img src={emptyCart} alt="Empty shopping cart illustration" />
				</div>
			</div>
		);
	}
	return (
		<section className="px-6 md:px-10 py-8 md:py-16 space-y-8">
			<Button
				className="cursor-pointer text-primary border-primary hover:bg-primary-foreground hover:text-primary/90"
				variant={"outline"}
				asChild
			>
				<Link to={"/menu"}>Back to Menu</Link>
			</Button>
			<h1 className="text-3xl lg:text-4xl font-bold tracking-tight">
				Cart Items {cartItemCount > 0 && `(${cartItemCount})`}
			</h1>

			<div className="grid md:grid-cols-2 gap-12 lg:grid-cols-5 justify-center">
				{/* Cart Cards */}
				<div className="lg:col-span-3 space-y-6">
					{cartLoading
						? [...Array(3)].map((_, i) => <CartCardSkeleton key={i} />)
						: cart?.cartItems.map((item) => (
								<CartCard key={item.id} cartItem={item} />
							))}
					<div className="hidden md:block text-center">
						<Dialog>
							<DialogTrigger asChild>
								<Button
									variant="outline"
									className="cursor-pointer w-full"
									disabled={clearCartMutation.isPending || cartLoading}
								>
									<Trash2 className="mr-2 size-4" />
									<span>Clear Cart</span>
								</Button>
							</DialogTrigger>
							<DialogContent>
								<DialogHeader>
									<DialogTitle>Clear Cart?</DialogTitle>
									<DialogDescription>
										This will remove all items from your cart. This action
										cannot be undone.
									</DialogDescription>
								</DialogHeader>
								<DialogFooter>
									<DialogClose asChild>
										<Button variant="outline">Cancel</Button>
									</DialogClose>
									<DialogClose asChild>
										<Button
											variant="destructive"
											onClick={() => clearCartMutation.mutate()}
											disabled={clearCartMutation.isPending}
										>
											{clearCartMutation.isPending
												? "Clearing..."
												: "Clear Cart"}
										</Button>
									</DialogClose>
								</DialogFooter>
							</DialogContent>
						</Dialog>
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
										<p>₹{cart?.subtotal}</p>
									</div>
									<div className="flex justify-between">
										<p>Delivery fee</p>
										<p>₹{cart?.deliveryCharge}</p>
									</div>
									<div className="flex justify-between">
										<p>Tax</p>
										<p>₹{cart?.tax}</p>
									</div>
									<Separator />
									<div className="flex justify-between">
										<p className="text-lg font-semibold">Total</p>
										<p className="font-semibold text-lg text-primary">
											₹{cart?.total}
										</p>
									</div>
								</div>
							)}

							<Separator />

							{/* Delivery */}
							{userPending ? (
								<Skeleton />
							) : !user ? (
								<Alert>
									<AlertCircle className="size-4" />
									<AlertDescription>
										<span>
											Please
											<Link
												to="/login"
												className="text-primary hover:underline font-medium px-1"
											>
												login
											</Link>
											to manage delivery addresses.
										</span>
									</AlertDescription>
								</Alert>
							) : addressesLoading ? (
								<Skeleton />
							) : addresses && addresses.length > 0 ? (
								<>
									{selectedAddress && (
										<AddressDisplay address={selectedAddress} />
									)}

									{/* Change Address Dialog */}
									{addresses.length > 1 && (
										<Dialog>
											<DialogTrigger asChild>
												<Button variant="link" className="cursor-pointer pl-0">
													Change address
												</Button>
											</DialogTrigger>
											<DialogContent className="max-h-[80vh] overflow-y-auto">
												<DialogHeader>
													<DialogTitle>Select Delivery Address</DialogTitle>
													<DialogDescription>
														Choose an address for delivery
													</DialogDescription>
												</DialogHeader>

												<RadioGroup
													value={selectedAddressId ?? ""}
													onValueChange={setSelectedAddressId}
												>
													{addresses.map((addr) => (
														<div
															key={addr.id}
															className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent cursor-pointer"
														>
															<RadioGroupItem
																value={addr.id}
																id={addr.id}
																className="mt-1"
															/>
															<Label
																htmlFor={addr.id}
																className="flex-1 cursor-pointer"
															>
																<AddressDisplay address={addr} />
															</Label>
														</div>
													))}
												</RadioGroup>
											</DialogContent>
										</Dialog>
									)}

									{/* Add New Address Dialog */}
									<Dialog>
										<DialogTrigger asChild>
											<Button variant="link" className="cursor-pointer pl-0">
												Add new address
											</Button>
										</DialogTrigger>
										<DialogContent>
											<DialogHeader>
												<DialogTitle>Add new Address</DialogTitle>
												<DialogDescription>
													Add a new delivery address to your account
												</DialogDescription>
											</DialogHeader>
											<CreateAddressForm />
										</DialogContent>
									</Dialog>
								</>
							) : (
								<>
									<Alert>
										<AlertCircle className="size-4" />
										<AlertDescription>
											No addresses found. Please add a delivery address to
											continue.
										</AlertDescription>
									</Alert>
									<Dialog>
										<DialogTrigger asChild>
											<Button variant="link" className="">
												Add new address
											</Button>
										</DialogTrigger>
										<DialogContent>
											<DialogHeader>
												<DialogTitle>Add new Address</DialogTitle>
												<DialogDescription>
													Add a new delivery address to your account
												</DialogDescription>
											</DialogHeader>
											<CreateAddressForm />
										</DialogContent>
									</Dialog>
								</>
							)}

							<Separator />

							<div>
								<p className="text-sm font-semibold pb-2">Notes</p>
								<Input
									value={notes}
									onChange={(e) => setNotes(e.target.value)}
									placeholder="extra delivery instructions"
								/>
							</div>

							<Separator />
							<RadioGroup
								value={paymentMethod}
								onValueChange={(value) =>
									setPaymentMethod(value as PaymentMethod)
								}
							>
								<div className="flex items-center space-x-2">
									<RadioGroupItem
										value={PAYMENT_METHOD.DIGITAL}
										id={PAYMENT_METHOD.DIGITAL}
									/>
									<Label htmlFor={PAYMENT_METHOD.DIGITAL}>
										Pay Online (UPI/Card)
									</Label>
								</div>
								<div className="flex items-center space-x-2">
									<RadioGroupItem
										value={PAYMENT_METHOD.COD}
										id={PAYMENT_METHOD.COD}
									/>
									<Label htmlFor={PAYMENT_METHOD.COD}>Cash on Delivery</Label>
								</div>
							</RadioGroup>

							<Separator />

							<Button
								size="lg"
								className="w-full cursor-pointer"
								disabled={!canPlaceOrder}
								onClick={handleCheckout}
							>
								<span className="text-lg">
									{createOrderMutation.isPending
										? "Placing your order..."
										: !selectedAddressId
											? "Select Address to Continue"
											: `Place Order - ₹${cart?.total}`}
								</span>
							</Button>
						</CardContent>
						<CardFooter>
							<p className="text-xs font-light text-muted-foreground mx-auto">
								By placing this order, you agree to our Terms & Conditions
							</p>
						</CardFooter>
					</Card>
				</div>

				{/* Mobile Clear Cart Button */}
				<div className="-mt-4 md:hidden">
					<Dialog>
						<DialogTrigger asChild>
							<Button
								variant="outline"
								className="cursor-pointer w-full"
								disabled={clearCartMutation.isPending || cartLoading}
							>
								<Trash2 className="mr-2 h-4 w-4" />
								<span>Clear Cart</span>
							</Button>
						</DialogTrigger>
						<DialogContent>
							<DialogHeader>
								<DialogTitle>Clear Cart?</DialogTitle>
								<DialogDescription>
									This will remove all items from your cart. This action cannot
									be undone.
								</DialogDescription>
							</DialogHeader>
							<DialogFooter>
								<DialogClose asChild>
									<Button variant="outline">Cancel</Button>
								</DialogClose>
								<DialogClose asChild>
									<Button
										variant="destructive"
										onClick={() => clearCartMutation.mutate()}
										disabled={clearCartMutation.isPending}
									>
										{clearCartMutation.isPending ? "Clearing..." : "Clear Cart"}
									</Button>
								</DialogClose>
							</DialogFooter>
						</DialogContent>
					</Dialog>
				</div>
			</div>
		</section>
	);
}
export default Cart;
