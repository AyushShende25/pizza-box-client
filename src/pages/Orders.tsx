import { fetchMyOrdersQueryOptions } from "@/api/ordersApi";
import OrderCard from "@/components/OrderCard";
import { OrderCardSkeleton } from "@/components/skeletons/OrderCardSkeleton";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { ORDER_STATUS, type OrderStatus } from "@/types/orders";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

function Orders() {
	const { ref, inView } = useInView();
	const [selectedStatus, setSelectedStatus] = useState<string>("all");

	const {
		data: orders,
		isFetchingNextPage,
		hasNextPage,
		fetchNextPage,
		isPending: ordersPending,
	} = useInfiniteQuery(
		fetchMyOrdersQueryOptions({
			orderStatus:
				selectedStatus === "all" ? undefined : (selectedStatus as OrderStatus),
		}),
	);

	useEffect(() => {
		if (inView && hasNextPage && !isFetchingNextPage) {
			fetchNextPage();
		}
	}, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

	return (
		<section className="px-6 md:px-10 lg:px-16 py-8 md:py-16 space-y-14">
			{/* Header */}
			<div className="text-center space-y-2">
				<h1 className="text-3xl lg:text-4xl font-bold tracking-tight">
					My Orders
				</h1>
				<p>Track and manage your pizza orders</p>
			</div>

			<div className="space-y-6 md:space-y-10">
				{/* Status Filter */}
				<div className="flex justify-end">
					<Select
						onValueChange={(v) => setSelectedStatus(v)}
						value={selectedStatus}
					>
						<SelectTrigger className="w-[220px]">
							<SelectValue placeholder="Filter by status" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="all">All Orders</SelectItem>
							<SelectGroup>
								<SelectLabel>Active</SelectLabel>
								<SelectItem value={ORDER_STATUS.PENDING}>Pending</SelectItem>
								<SelectItem value={ORDER_STATUS.CONFIRMED}>
									Confirmed
								</SelectItem>
								<SelectItem value={ORDER_STATUS.PREPARING}>
									Preparing
								</SelectItem>
								<SelectItem value={ORDER_STATUS.OUT_FOR_DELIVERY}>
									Out for Delivery
								</SelectItem>
							</SelectGroup>
							<SelectGroup>
								<SelectLabel>Completed</SelectLabel>
								<SelectItem value={ORDER_STATUS.DELIVERED}>
									Delivered
								</SelectItem>
							</SelectGroup>
							<SelectGroup>
								<SelectLabel>Cancelled</SelectLabel>
								<SelectItem value={ORDER_STATUS.CANCELLED}>
									Cancelled
								</SelectItem>
							</SelectGroup>
						</SelectContent>
					</Select>
				</div>

				{/* Orders List */}
				<div className="space-y-6 md:space-y-8">
					{ordersPending ? (
						<div className="space-y-4">
							{[...Array(3)].map((_, i) => (
								<OrderCardSkeleton key={i} />
							))}
						</div>
					) : orders?.pages.length === 0 ||
						orders?.pages.every((page) => page.length === 0) ? (
						<p className="text-center text-muted-foreground">
							No orders found.
						</p>
					) : (
						orders?.pages.flatMap((page) =>
							page.map((order) => <OrderCard key={order.id} order={order} />),
						)
					)}
				</div>
				<div ref={ref} />
			</div>
		</section>
	);
}
export default Orders;
