import {
	queryOptions,
	useMutation,
	useQueryClient,
} from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { toast } from "sonner";
import type { Notification } from "@/types/notifications";
import { api } from "./axios";

export const notificationsApi = {
	fetchNotifications: async (): Promise<Notification[]> => {
		const res = await api.get("/notifications", {
			params: {
				limit: 10,
			},
		});
		return res.data;
	},
	markAsRead: async (notificationIds: string[]) => {
		const res = await api.post("/notifications/mark-read", { notificationIds });
		return res.data;
	},
};

export const fetchNotificationsQueryOptions = () =>
	queryOptions({
		queryKey: ["notifications"],
		queryFn: notificationsApi.fetchNotifications,
		staleTime: Number.POSITIVE_INFINITY,
	});

export function useMarkAsRead() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: notificationsApi.markAsRead,
		onMutate: async (notificationIds: string[]) => {
			const queryKey = ["notifications"];
			await queryClient.cancelQueries({ queryKey });
			const previousNotifications =
				queryClient.getQueryData<Notification[]>(queryKey);

			queryClient.setQueryData<Notification[]>(queryKey, (old) => {
				if (!old) return old;

				return old.map((n) =>
					notificationIds.includes(n.id) ? { ...n, isRead: true } : n,
				);
			});
			return { previousNotifications, queryKey };
		},
		onSettled: () => {
			queryClient.invalidateQueries({ queryKey: ["notifications"] });
		},
		onError: (error: AxiosError<any>, _vars, context) => {
			if (context?.previousNotifications && context?.queryKey) {
				queryClient.setQueryData(
					context.queryKey,
					context.previousNotifications,
				);
			}
			const message = error.response?.data?.message ?? "Something went wrong";
			toast.error(message);
		},
	});
}
