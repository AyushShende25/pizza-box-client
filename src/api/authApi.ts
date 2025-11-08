import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { api } from "@/api/axios";
import type { ForgotPasswordFormType } from "@/pages/ForgotPassword";
import type { LoginFormType } from "@/pages/Login";
import type { RegisterFormType } from "@/pages/Register";
import type { ResetPasswordFormType } from "@/pages/ResetPassword";
import type { User } from "@/types/user";
import { useMergeCart } from "./cartApi";

export const authApi = {
	register: async (registerFormData: RegisterFormType) => {
		const res = await api.post("/auth/register", registerFormData);
		return res.data;
	},
	verify: async (token: string) => {
		const res = await api.get(`/auth/verify-email?token=${token}`);
		return res.data;
	},
	resendVerificationToken: async (email: string) => {
		const res = await api.post("/auth/resend-verification", { email });
		return res.data;
	},
	login: async (loginFormData: LoginFormType) => {
		const res = await api.post("/auth/login", loginFormData);
		return res.data;
	},
	getMe: async (): Promise<User | null> => {
		try {
			const res = await api.get("/auth/me");
			return res.data;
		} catch (error) {
			console.log(error);
			return null;
		}
	},
	refresh: async () => {
		const res = await api.post("/auth/refresh");
		return res.data;
	},
	logout: async () => {
		const res = await api.post("/auth/logout");
		return res.data;
	},
	forgotPassword: async (forgotPasswordData: ForgotPasswordFormType) => {
		const res = await api.post("/auth/forgot-password", forgotPasswordData);
		return res.data;
	},
	resetPassword: async (
		token: string,
		resetFormData: ResetPasswordFormType,
	) => {
		const res = await api.post(`/auth/reset-password?token=${token}`, {
			password: resetFormData.password,
		});
		return res.data;
	},
};

export function useMe() {
	return useQuery({
		queryKey: ["me"],
		queryFn: authApi.getMe,
		staleTime: Number.POSITIVE_INFINITY,
		retry: false,
	});
}

export function useRegister() {
	const navigate = useNavigate();
	return useMutation({
		mutationFn: (data: RegisterFormType) => authApi.register(data),
		onSuccess: () => {
			toast.success("user registered successfully, please verify your email.");
			navigate("/login");
		},
	});
}

export function useVerify() {
	const navigate = useNavigate();
	return useMutation({
		mutationFn: (token: string) => authApi.verify(token),
		onSuccess: () => {
			toast.success("user account verified successfully, please login.");
			navigate("/login");
		},
	});
}

export function useResendToken() {
	return useMutation({
		mutationFn: (email: string) => authApi.resendVerificationToken(email),
		onSuccess: () => {
			toast.success("Token resent successfully, check your email.");
		},
		onError: (err: any) => {
			toast.error(
				err?.response?.data?.message ||
					"Could not send token, please contact support.",
			);
		},
	});
}

export function useLogin() {
	const queryClient = useQueryClient();
	const navigate = useNavigate();
	const mergeCartMutation = useMergeCart();
	return useMutation({
		mutationFn: (data: LoginFormType) => authApi.login(data),
		onSuccess: async () => {
			queryClient.invalidateQueries({ queryKey: ["me"] });
			navigate("/");
			(await mergeCartMutation).mutateAsync();
		},
	});
}

export function useForgotPassword() {
	const navigate = useNavigate();
	return useMutation({
		mutationFn: (data: ForgotPasswordFormType) => authApi.forgotPassword(data),
		onSuccess: () => {
			toast.success(
				"You will receive the reset instructions, if your account exists",
			);
			navigate("/login");
		},
	});
}
export function useResetPassword() {
	const navigate = useNavigate();
	return useMutation({
		mutationFn: ({
			token,
			data,
		}: {
			token: string;
			data: ResetPasswordFormType;
		}) => authApi.resetPassword(token, data),
		onSuccess: () => {
			toast.success("password reset successfully");
			navigate("/login");
		},
	});
}

export function useLogout() {
	const queryClient = useQueryClient();
	const navigate = useNavigate();
	return useMutation({
		mutationFn: authApi.logout,
		onSettled: () => {
			queryClient.clear();
			navigate("/");
		},
	});
}

api.interceptors.response.use(
	function onFulfilled(response) {
		return response;
	},
	async function onRejected(error) {
		const originalRequest = error.config;
		const errCode = error?.response?.data?.error;
		if (
			error.status === 401 &&
			errCode === "MISSING_TOKEN" &&
			!originalRequest._retry
		) {
			originalRequest._retry = true;
			await authApi.refresh();
			return api(originalRequest);
		}
		return Promise.reject(error);
	},
);
