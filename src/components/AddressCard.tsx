import {
	Card,
	CardAction,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import type { Address } from "@/types/address";
import { Badge } from "@/components/ui/badge";
import { MapPin, Phone, Trash2, User } from "lucide-react";
import { Button } from "./ui/button";
import { useDeleteAddress, useUpdateDefaultAddress } from "@/api/addressApi";

function AddressCard({ address }: { address: Address }) {
	const addressDelMutation = useDeleteAddress();
	const makeDefaultAddressMutation = useUpdateDefaultAddress();
	return (
		<Card className="gap-2 relative">
			<CardHeader>
				<CardTitle>
					<div className="flex items-center gap-2">
						<User className="size-4 text-muted-foreground" />
						<h4 className="text-base font-semibold">{address.fullName}</h4>
					</div>
				</CardTitle>
				<CardAction>
					{address.isDefault && (
						<Badge
							variant="secondary"
							className="text-xs font-medium bg-primary/10 text-primary"
						>
							Default
						</Badge>
					)}
					{!address.isDefault && (
						<Badge
							onClick={() => makeDefaultAddressMutation.mutateAsync(address.id)}
							variant={"outline"}
							className="text-xs  font-light cursor-pointer"
						>
							make default
						</Badge>
					)}
				</CardAction>
			</CardHeader>

			<CardContent className="space-y-2 text-sm text-muted-foreground">
				<div className="flex items-start gap-2">
					<MapPin className="size-4 mt-0.5 text-muted-foreground" />
					<div>
						<p>{address.street}</p>
						<p>
							{address.city}, {address.state}
						</p>
						<p>
							{address.country} - {address.postalCode}
						</p>
					</div>
				</div>

				<div className="flex items-center gap-2">
					<Phone className="size-4 text-muted-foreground" />
					<span>{address.phoneNumber}</span>
				</div>
			</CardContent>
			<CardFooter className="absolute right-0 bottom-4">
				<Button
					onClick={() => addressDelMutation.mutateAsync(address.id)}
					size={"icon"}
					variant={"ghost"}
					className="cursor-pointer"
				>
					<Trash2 className="text-destructive" />
				</Button>
			</CardFooter>
		</Card>
	);
}

export default AddressCard;
