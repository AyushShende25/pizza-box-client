import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { useFetchCrusts } from "@/api/crustApi";
import { useFetchSizes } from "@/api/sizeApi";
import { useFetchToppings } from "@/api/toppingsApi";
import {
	SheetClose,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
} from "@/components/ui/sheet";
import type { Pizza } from "@/types/pizza";
import { useEffect, useMemo, useState } from "react";
import { useAddToCart } from "@/api/cartApi";
import { Drumstick, Leaf, Loader2 } from "lucide-react";
import PizzaOptionsSkeleton from "@/components/skeletons/PizzaOptionsSkeleton";

function PizzaOptionsModal({
	pizza: { name, description, basePrice, id: pizzaId, defaultToppings },
}: {
	pizza: Pizza;
}) {
	const { data: crusts, isPending: crustsLoading } = useFetchCrusts();
	const { data: sizes, isPending: sizesLoading } = useFetchSizes();
	const { data: toppings, isPending: toppingsLoading } = useFetchToppings();

	const extraToppingsVeg = useMemo(
		() =>
			toppings?.filter(
				(t) =>
					!defaultToppings?.some((d) => d.id === t.id) &&
					t.isVegetarian === true,
			) ?? [],
		[toppings, defaultToppings],
	);

	const extraToppingsNonVeg = useMemo(
		() =>
			toppings?.filter(
				(t) =>
					!defaultToppings?.some((d) => d.id === t.id) &&
					t.isVegetarian === false,
			) ?? [],
		[toppings, defaultToppings],
	);

	const [selectedSizeId, setSelectedSizeId] = useState<string | null>(null);
	const [selectedCrustId, setSelectedCrustId] = useState<string | null>(null);
	const [selectedToppingIds, setSelectedToppingIds] = useState<string[]>([]);
	const [quantity, setQuantity] = useState(1);

	useEffect(() => {
		if (sizes?.length && !selectedSizeId) {
			setSelectedSizeId(sizes[0].id);
		}
		if (crusts?.length && !selectedCrustId) {
			setSelectedCrustId(crusts[0].id);
		}
	}, [sizes, crusts, selectedSizeId, selectedCrustId]);

	const addToCartMutation = useAddToCart();

	const handleAddToCart = async () => {
		if (!selectedSizeId || !selectedCrustId) return;
		await addToCartMutation.mutateAsync({
			pizzaId,
			sizeId: selectedSizeId,
			crustId: selectedCrustId,
			toppingIds: selectedToppingIds,
			quantity,
		});
	};

	const totalPrice = useMemo(() => {
		let total = Number(basePrice);

		const selectedSize = sizes?.find((s) => s.id === selectedSizeId);
		const selectedCrust = crusts?.find((c) => c.id === selectedCrustId);
		const selectedToppings = toppings?.filter((t) =>
			selectedToppingIds.includes(t.id),
		);

		const selectedToppingsPrice =
			selectedToppings?.reduce((acc, curr) => acc + Number(curr.price), 0) ?? 0;

		if (selectedSize && selectedCrust) {
			total =
				Number(selectedSize.multiplier) * Number(basePrice) +
				Number(selectedCrust.additionalPrice) +
				selectedToppingsPrice;
		}

		return total * quantity;
	}, [
		basePrice,
		selectedSizeId,
		selectedCrustId,
		selectedToppingIds,
		sizes,
		crusts,
		toppings,
		quantity,
	]);

	const toggleTopping = (id: string, checked: boolean) => {
		setSelectedToppingIds((prev) =>
			checked ? [...prev, id] : prev.filter((t) => t !== id),
		);
	};

	if (crustsLoading || sizesLoading || toppingsLoading) {
		return <PizzaOptionsSkeleton />;
	}

	return (
		<SheetContent className="px-4 overflow-y-scroll">
			<SheetHeader>
				<SheetTitle>Customize Your Pizza 🍕</SheetTitle>
				<SheetDescription>
					Choose crust, size, and toppings before adding to cart.
				</SheetDescription>
				<div className="pt-2">
					<SheetTitle className="text-xl">{name}</SheetTitle>
					<SheetDescription>{description}</SheetDescription>
				</div>
			</SheetHeader>

			{/* Default Toppings */}
			<div className="space-y-3">
				<Label>Default Toppings</Label>
				<div className="flex flex-wrap gap-2">
					{defaultToppings?.map((topping) => (
						<Badge key={topping.id} variant="secondary">
							{topping.name}
						</Badge>
					))}
				</div>
			</div>

			{/* Size Selection */}
			<div className="space-y-3">
				<Label className="text-sm font-semibold">Choose Size</Label>
				<RadioGroup
					value={selectedSizeId ?? undefined}
					onValueChange={(v) => setSelectedSizeId(v)}
				>
					{sizes?.map((size) => {
						const additionalPrice =
							size.multiplier * Number(basePrice) - Number(basePrice);
						return (
							<div
								key={size.id}
								className="flex items-center space-x-2 rounded-md border p-3 hover:bg-accent transition-colors"
							>
								<RadioGroupItem value={size.id} id={size.id} />
								<Label
									htmlFor={size.id}
									className="flex-1 cursor-pointer font-normal"
								>
									<div className="flex w-full justify-between items-center">
										<span className="font-medium">{size.displayName}</span>
										{additionalPrice > 0 && (
											<span className="text-sm text-muted-foreground">
												+₹{additionalPrice.toFixed(0)}
											</span>
										)}
									</div>
								</Label>
							</div>
						);
					})}
				</RadioGroup>
			</div>

			{/* Crust Selection */}
			<div className="space-y-3">
				<Label className="text-sm font-semibold">Choose Crust</Label>
				<RadioGroup
					value={selectedCrustId ?? undefined}
					onValueChange={(v) => setSelectedCrustId(v)}
				>
					{crusts?.map((crust) => (
						<div
							key={crust.id}
							className="flex items-center space-x-2 rounded-md border p-3 hover:bg-accent transition-colors"
						>
							<RadioGroupItem value={crust.id} id={crust.id} />
							<Label
								htmlFor={crust.id}
								className="flex-1 cursor-pointer font-normal"
							>
								<div className="w-full flex justify-between items-center">
									<span className="font-medium">{crust.name}</span>
									{Number(crust.additionalPrice) > 0 && (
										<span className="text-sm text-muted-foreground">
											+₹{crust.additionalPrice}
										</span>
									)}
								</div>
							</Label>
						</div>
					))}
				</RadioGroup>
			</div>

			{/* Veg Toppings */}
			{extraToppingsVeg && (
				<div className="space-y-3">
					<Label className="text-sm font-semibold flex items-center gap-2">
						<Leaf className="h-4 w-4 text-green-600" />
						Add Veg Toppings
					</Label>
					<div className="grid grid-cols-1 gap-2">
						{extraToppingsVeg.map((topping) => (
							<div
								key={topping.id}
								className="flex items-center space-x-2 rounded-md border p-3 hover:bg-accent transition-colors"
							>
								<Checkbox
									id={topping.id}
									checked={selectedToppingIds.includes(topping.id)}
									onCheckedChange={(checked) =>
										toggleTopping(topping.id, !!checked)
									}
								/>
								<Label
									htmlFor={topping.id}
									className="flex-1 cursor-pointer font-normal"
								>
									<div className="w-full flex justify-between items-center">
										<span>{topping.name}</span>
										<span className="text-sm text-muted-foreground">
											+₹{topping.price}
										</span>
									</div>
								</Label>
							</div>
						))}
					</div>
				</div>
			)}

			{/* Non-Veg Toppings */}
			{extraToppingsNonVeg && (
				<div className="space-y-3">
					<Label className="text-sm font-semibold flex items-center gap-2">
						<Drumstick className="h-4 w-4 text-red-600" />
						Add Non-Veg Toppings
					</Label>
					<div className="grid grid-cols-1 gap-2">
						{extraToppingsNonVeg.map((topping) => (
							<div
								key={topping.id}
								className="flex items-center space-x-2 rounded-md border p-3 hover:bg-accent transition-colors"
							>
								<Checkbox
									id={topping.id}
									checked={selectedToppingIds.includes(topping.id)}
									onCheckedChange={(checked) =>
										toggleTopping(topping.id, !!checked)
									}
								/>
								<Label
									htmlFor={topping.id}
									className="flex-1 cursor-pointer font-normal"
								>
									<div className="w-full flex justify-between items-center">
										<span>{topping.name}</span>
										<span className="text-sm text-muted-foreground">
											+₹{topping.price}
										</span>
									</div>
								</Label>
							</div>
						))}
					</div>
				</div>
			)}

			{/* Quantity Selector */}
			<div className="space-y-3">
				<Label className="text-sm font-semibold">Quantity</Label>
				<div className="w-full flex items-center gap-3">
					<Button
						variant="outline"
						size="icon"
						onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
						disabled={quantity <= 1}
					>
						-
					</Button>
					<span className="text-lg font-medium w-12 text-center">
						{quantity}
					</span>
					<Button
						variant="outline"
						size="icon"
						onClick={() => setQuantity((prev) => prev + 1)}
					>
						+
					</Button>
				</div>
			</div>
			<SheetFooter className="space-y-3">
				<div className="flex justify-between items-center text-lg font-semibold">
					<span>Total:</span>
					<span>₹{totalPrice.toFixed(2)}</span>
				</div>
				<div className="flex gap-2">
					<SheetClose asChild>
						<Button
							variant="outline"
							className="flex-1"
							disabled={addToCartMutation.isPending}
						>
							Cancel
						</Button>
					</SheetClose>
					<SheetClose asChild>
						<Button
							onClick={handleAddToCart}
							className="flex-1"
							disabled={
								!selectedSizeId ||
								!selectedCrustId ||
								addToCartMutation.isPending
							}
						>
							{addToCartMutation.isPending ? (
								<>
									<Loader2 className="mr-2 size-4 animate-spin" />
									Adding...
								</>
							) : (
								"Add to Cart"
							)}
						</Button>
					</SheetClose>
				</div>
			</SheetFooter>
		</SheetContent>
	);
}
export default PizzaOptionsModal;
