import { zodResolver } from "@hookform/resolvers/zod";
import { TriangleAlert } from "lucide-react";
import { useForm } from "react-hook-form";
import { useSearchParams } from "react-router";
import * as z from "zod";
import { useResetPassword } from "@/api/authApi";
import Logo from "@/components/Logo";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const resetPasswordFormSchema = z
	.object({
		password: z
			.string()
			.min(8, "Password must be at least 8 characters long")
			.max(255),
		confirm: z.string(),
	})
	.refine((data) => data.password === data.confirm, {
		message: "Passwords don't match",
		path: ["confirm"], // path of error
	});
export type ResetPasswordFormType = z.infer<typeof resetPasswordFormSchema>;

function ResetPassword() {
	const form = useForm<ResetPasswordFormType>({
		resolver: zodResolver(resetPasswordFormSchema),
		defaultValues: {
			password: "",
			confirm: "",
		},
	});

	const [searchParams] = useSearchParams();
	const token = searchParams.get("token");

	const resetPassword = useResetPassword();

	if (!token) {
		return (
			<div className="flex items-center justify-center h-screen p-6">
				<Alert className="max-w-sm" variant="destructive">
					<TriangleAlert />
					<AlertTitle>Invalid Link</AlertTitle>
					<AlertDescription>Missing or invalid reset token.</AlertDescription>
				</Alert>
			</div>
		);
	}

	async function onSubmit(values: ResetPasswordFormType) {
		if (!token) return; //satisfying typescript
		try {
			await resetPassword.mutateAsync({ data: values, token });
		} catch (error: any) {
			const errorMessage =
				error?.response?.data?.message ||
				error?.message ||
				"Something went wrong. Please try again later.";
			form.setError("root.serverError", {
				type: error?.status,
				message: errorMessage,
			});
		}
	}

	return (
		<div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
			<div className="w-full max-w-sm">
				<Card>
					<CardHeader>
						<div className="mb-6 mx-auto">
							<Logo />
						</div>
						<CardTitle>Reset your password</CardTitle>
					</CardHeader>
					<CardContent>
						<Form {...form}>
							<form
								onSubmit={form.handleSubmit(onSubmit)}
								className="space-y-6"
							>
								<FormField
									control={form.control}
									name="password"
									render={({ field }) => (
										<FormItem>
											<FormLabel>New Password</FormLabel>
											<FormControl>
												<Input type="password" {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="confirm"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Confirm New Password</FormLabel>
											<FormControl>
												<Input type="password" {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								{form.formState?.errors?.root?.serverError ? (
									<p className="text-destructive text-center">
										{form.formState?.errors?.root?.serverError.message}
									</p>
								) : null}

								<Button
									disabled={resetPassword.isPending}
									className="w-full"
									type="submit"
								>
									{resetPassword.isPending ? "Resetting..." : "Reset Password"}
								</Button>
							</form>
						</Form>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
export default ResetPassword;
