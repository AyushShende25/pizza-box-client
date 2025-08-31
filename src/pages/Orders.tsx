import OrderCard from "@/components/OrderCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

function Orders() {
	return (
		<section className="px-6 md:px-10 lg:px-16 py-8 md:py-16 space-y-14">
			<div className="text-center space-y-2">
				<h1 className="text-3xl lg:text-4xl font-bold tracking-tight">
					My Orders
				</h1>
				<p>Track and manage your pizza orders</p>
			</div>
			<div>
				<Tabs defaultValue="active" className="w-full space-y-6">
					<TabsList className="self-center">
						<TabsTrigger value="active">Active</TabsTrigger>
						<TabsTrigger value="completed">Completed</TabsTrigger>
					</TabsList>
					<TabsContent className="space-y-6 md:space-y-10" value="active">
						<OrderCard />
						<OrderCard />
					</TabsContent>
					<TabsContent value="completed">
						<OrderCard />
					</TabsContent>
				</Tabs>
			</div>
		</section>
	);
}
export default Orders;
