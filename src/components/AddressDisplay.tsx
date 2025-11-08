import type { Address } from "@/types/address";

function AddressDisplay({ address }: { address: Address }) {
	if (!address) return null;
	return (
		<div className="space-y-1  text-sm py-1">
			<p className="space-x-1">
				<span>Delivering to</span>
				<span className="font-bold">{address.fullName}</span>
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
				<span>Postal Code: {address.postalCode}</span>
				<span>Phone: {address.phoneNumber}</span>
			</p>
		</div>
	);
}
export default AddressDisplay;
