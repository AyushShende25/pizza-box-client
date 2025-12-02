import { useSuspenseQuery } from "@tanstack/react-query";
import { Bell } from "lucide-react";
import {
	fetchNotificationsQueryOptions,
	useMarkAsRead,
} from "@/api/notificationsApi";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn, getTimeAgo } from "@/lib/utils";
import type { Notification } from "@/types/notifications";

function Notifications() {
	const { data } = useSuspenseQuery(fetchNotificationsQueryOptions());

	const markAsReadMutation = useMarkAsRead();

	const unread = data.filter((i) => !i.isRead);
	const unreadCount = unread.length;

	const handleNotificationClick = async (notification: Notification) => {
		if (notification.isRead) return;
		await markAsReadMutation.mutateAsync([notification.id]);
	};

	const handleMarkAllRead = async () => {
		if (unread.length === 0) return;
		await markAsReadMutation.mutateAsync(unread.map((i) => i.id));
	};

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button size="icon" variant="outline" className="relative">
					<Bell className="size-5 text-muted-foreground" />
					{unreadCount > 0 && (
						<span className="absolute -right-2 -top-2 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-primary px-1 text-xs font-semibold text-primary-foreground shadow-md">
							{unreadCount}
						</span>
					)}
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end" className="w-80">
				{data.length === 0 ? (
					<div className="p-4 text-center text-sm text-muted-foreground">
						No notifications yet
					</div>
				) : (
					<>
						<DropdownMenuLabel className="flex items-center justify-between">
							<span className="">Notifications</span>
							<Button
								variant={"link"}
								size={"sm"}
								className="text-xs text-muted-foreground hover:text-foreground cursor-pointer"
								onClick={handleMarkAllRead}
							>
								Mark all as read
							</Button>
						</DropdownMenuLabel>
						<DropdownMenuSeparator />
						<div className="max-h-72 overflow-y-auto overscroll-contain space-y-2">
							{data.map((item) => (
								<DropdownMenuItem
									key={item.id}
									className={cn("flex flex-col items-start gap-0.5", {
										"bg-accent cursor-pointer": !item.isRead,
									})}
									onClick={() => handleNotificationClick(item)}
								>
									<div className="flex items-start justify-between w-full gap-3">
										<div className="flex items-center gap-2">
											<p
												className={cn("text-sm leading-tight", {
													"font-medium": !item.isRead,
												})}
											>
												{item.title}
											</p>
										</div>

										<span className="text-xs text-muted-foreground shrink-0">
											{getTimeAgo(item.createdAt)}
										</span>
									</div>

									<p className="text-xs text-muted-foreground leading-snug  flex gap-2 justify-between w-full">
										<span>{item.message}</span>
										{!item.isRead && (
											<span className="size-2 rounded-full bg-primary mt-1" />
										)}
									</p>
								</DropdownMenuItem>
							))}
						</div>
					</>
				)}
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
export default Notifications;
