import { useFetchAddresses } from "@/api/addressApi";
import AddressCard from "@/components/AddressCard";
import CreateAddressCard from "@/components/CreateAddressCard";
import PizzaCardSkeleton from "@/components/skeletons/PizzaCardSkeleton";

function Address() {
	const { data: addresses, isPending } = useFetchAddresses();
	return (
		<section className="px-6 md:px-10 lg:px-16 py-8 md:py-16 ">
			<div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 lg:gap-10">
				{isPending
					? [...Array(5)].map((_, i) => <PizzaCardSkeleton key={i} />)
					: addresses
							?.sort((a, b) => Number(b.is_default) - Number(a.is_default))
							.map((add) => <AddressCard key={add.id} address={add} />)}
				<CreateAddressCard />
			</div>
		</section>
	);
}
export default Address;
