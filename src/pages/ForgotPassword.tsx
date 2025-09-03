import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useForgotPassword } from "@/api/authApi";
import Logo from "@/components/Logo";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const forgotPasswordFormSchema = z.object({
	email: z.email(),
});
export type ForgotPasswordFormType = z.infer<typeof forgotPasswordFormSchema>;

function ForgotPassword() {
	const form = useForm<ForgotPasswordFormType>({
		resolver: zodResolver(forgotPasswordFormSchema),
		defaultValues: {
			email: "",
		},
	});

	const forgotPassword = useForgotPassword();

	async function onSubmit(values: ForgotPasswordFormType) {
		try {
			await forgotPassword.mutateAsync(values);
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
						<CardTitle>Forgot your password?</CardTitle>
						<CardDescription>
							Worry not! enter your registered email and we will send you a
							reset link
						</CardDescription>
					</CardHeader>
					<CardContent>
						<Form {...form}>
							<form
								onSubmit={form.handleSubmit(onSubmit)}
								className="space-y-6"
							>
								<FormField
									control={form.control}
									name="email"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Email</FormLabel>
											<FormControl>
												<Input placeholder="john@example.com" {...field} />
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
									disabled={forgotPassword.isPending}
									className="w-full"
									type="submit"
								>
									{forgotPassword.isPending ? "Sending..." : "Send Reset Link"}
								</Button>
							</form>
						</Form>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
export default ForgotPassword;
