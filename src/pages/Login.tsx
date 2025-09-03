import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link } from "react-router";
import * as z from "zod";
import { useLogin } from "@/api/authApi";
import Logo from "@/components/Logo";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
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

const loginFormSchema = z.object({
	email: z.email(),
	password: z
		.string()
		.min(8, "Password must be at-least 8 chars long")
		.max(255),
});
export type LoginFormType = z.infer<typeof loginFormSchema>;

function Login() {
	const form = useForm<LoginFormType>({
		resolver: zodResolver(loginFormSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const login = useLogin();

	async function onSubmit(values: LoginFormType) {
		try {
			await login.mutateAsync(values);
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
						<CardTitle>Login to your account</CardTitle>
						<CardDescription>
							Enter your email below to login to your account
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
								<FormField
									control={form.control}
									name="password"
									render={({ field }) => (
										<FormItem>
											<div className="flex justify-between">
												<FormLabel>Password</FormLabel>
												<Link
													to="/forgot-password"
													className="underline underline-offset-4 text-xs"
												>
													forgot password?
												</Link>
											</div>
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
									disabled={login.isPending}
									className="w-full"
									type="submit"
								>
									{login.isPending ? "Logging in..." : "Login"}
								</Button>
							</form>
						</Form>
					</CardContent>
					<CardFooter>
						<div className="mt-4 text-center flex-1 text-sm">
							Don&apos;t have an account?{" "}
							<Link to="/register" className="underline underline-offset-4">
								Sign up
							</Link>
						</div>
					</CardFooter>
				</Card>
			</div>
		</div>
	);
}
export default Login;
