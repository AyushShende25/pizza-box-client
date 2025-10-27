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
import { Link } from "react-router";
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
import type { Address } from "@/types/address";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useMe } from "@/api/authApi";
import { Skeleton } from "@/components/ui/skeleton";

function AddressDisplay({ address }: { address: Address }) {
	if (!address) return null;
	return (
		<div className="space-y-1  text-sm py-1">
			<p className="space-x-1">
				<span>Delivering to</span>
				<span className="font-bold">{address.full_name}</span>
			</p>
			<p className="space-x-1 text-muted-foreground">
				<span>{address.street}</span>
				<span>{address.city}</span>
			</p>
			<p className="space-x-1 text-muted-foreground">
				<span>{address.state}</span>
				<span>{address.country}</span>
			</p>
			<p className="space-x-1 text-muted-foreground">
				<span>Postal Code: {address.postal_code}</span>
				<span>Phone: {address.phone_number}</span>
			</p>
		</div>
	);
}

function Cart() {
	const { data: cart, isPending: cartLoading } = useFetchCart();
	const clearCartMutation = useClearCart();
	const { data: addresses, isPending: addressesLoading } = useFetchAddresses();
	const { data: user, isPending: userPending } = useMe();

	const defaultAddress = useMemo(
		() => addresses?.find((addr) => addr.is_default === true),
		[addresses],
	);
	const [selectedAddressId, setSelectedAddressId] = useState<string | null>(
		null,
	);

	useEffect(() => {
		if (defaultAddress?.id && !selectedAddressId) {
			setSelectedAddressId(defaultAddress.id);
		}
	}, [defaultAddress, selectedAddressId]);

	const selectedAddress = useMemo(
		() => addresses?.find((addr) => addr.id === selectedAddressId),
		[addresses, selectedAddressId],
	);
	const cartItemCount = cart?.item_count ?? 0;
	const canPlaceOrder = cartItemCount > 0 && selectedAddressId && !cartLoading;

	if (!cartLoading && !cart?.cart_items?.length) {
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
						: cart?.cart_items.map((item) => (
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
										<p>₹{cart?.delivery_charge}</p>
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
								// <Button variant="link" asChild>
								// 	<Link to={"/login"}>Login to manage addresses</Link>
								// </Button>
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
							<Button
								size="lg"
								className="w-full cursor-pointer"
								disabled={!canPlaceOrder}
							>
								<span className="text-lg">
									{cartLoading
										? "Processing..."
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
