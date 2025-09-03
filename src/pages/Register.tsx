import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link } from "react-router";
import * as z from "zod";
import { useRegister } from "@/api/authApi";
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

const registerFormSchema = z.object({
	email: z.email(),
	password: z
		.string()
		.min(8, "Password must be at-least 8 chars long")
		.max(255),
	firstName: z
		.string()
		.min(1, "first name cannot be empty")
		.max(50, "first name cannot be more that 50 chars"),
	lastName: z
		.string()
		.min(1, "last name cannot be empty")
		.max(50, "last name cannot be more that 50 chars"),
});
export type RegisterFormType = z.infer<typeof registerFormSchema>;

function Register() {
	const form = useForm<RegisterFormType>({
		resolver: zodResolver(registerFormSchema),
		defaultValues: {
			email: "",
			password: "",
			firstName: "",
			lastName: "",
		},
	});

	const register = useRegister();

	async function onSubmit(values: RegisterFormType) {
		try {
			await register.mutateAsync(values);
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
						<CardTitle>Get Started</CardTitle>
						<CardDescription>We are excited to have you</CardDescription>
					</CardHeader>
					<CardContent>
						<Form {...form}>
							<form
								onSubmit={form.handleSubmit(onSubmit)}
								className="space-y-4"
							>
								<FormField
									control={form.control}
									name="firstName"
									render={({ field }) => (
										<FormItem>
											<FormLabel>First Name</FormLabel>
											<FormControl>
												<Input placeholder="john" {...field} />
											</FormControl>

											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="lastName"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Last Name</FormLabel>
											<FormControl>
												<Input placeholder="doe" {...field} />
											</FormControl>

											<FormMessage />
										</FormItem>
									)}
								/>
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
											<FormLabel>Password</FormLabel>
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
									disabled={register.isPending}
									className="w-full"
									type="submit"
								>
									{register.isPending ? "...." : "Register"}
								</Button>
							</form>
						</Form>
					</CardContent>
					<CardFooter>
						<div className="mt-4 text-center flex-1 text-sm">
							Already have an account?{" "}
							<Link to="/login" className="underline underline-offset-4">
								Sign in
							</Link>
						</div>
					</CardFooter>
				</Card>
			</div>
		</div>
	);
}
export default Register;
