import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Plus } from "lucide-react";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateAddress } from "@/api/addressApi";

export const createAddressSchema = z.object({
	fullName: z
		.string()
		.min(1, { message: "Full name cannot be empty." })
		.max(100, { message: "Full name must be under 100 characters." }),
	street: z
		.string()
		.min(1, { message: "Street address cannot be empty." })
		.max(255, { message: "Street address must be under 255 characters." }),
	city: z
		.string()
		.min(1, { message: "City cannot be empty." })
		.max(100, { message: "City name must be under 100 characters." }),
	state: z
		.string()
		.min(1, { message: "State cannot be empty." })
		.max(100, { message: "State name must be under 100 characters." }),
	country: z
		.string()
		.min(1, { message: "Country cannot be empty." })
		.max(100, { message: "Country name must be under 100 characters." }),
	postalCode: z
		.string()
		.min(1, { message: "Postal code cannot be empty." })
		.max(20, { message: "Postal code must be under 20 characters." }),
	phoneNumber: z
		.string()
		.length(10, { message: "Phone number must be exactly 10 digits." })
		.regex(/^\d+$/, { message: "Phone number must contain only digits." }),
});
export type CreateAddressInput = z.infer<typeof createAddressSchema>;

function CreateAddressCard() {
	const addressMutation = useCreateAddress();
	const form = useForm<CreateAddressInput>({
		resolver: zodResolver(createAddressSchema),
		defaultValues: {
			fullName: "",
			street: "",
			city: "",
			state: "",
			country: "",
			postalCode: "",
			phoneNumber: "",
		},
	});

	async function onSubmit(values: CreateAddressInput) {
		try {
			await addressMutation.mutateAsync(values);
			form.reset();
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
		<Card>
			<Dialog>
				<DialogTrigger className="h-full">
					<div className="flex items-center justify-center w-full h-full text-muted-foreground hover:text-muted-foreground/50 cursor-pointer">
						<Plus className="size-16" />
					</div>
				</DialogTrigger>
				<DialogContent>
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
							<DialogHeader>
								<DialogTitle>Add new Address</DialogTitle>
							</DialogHeader>
							<div className="space-y-4">
								<FormField
									control={form.control}
									name="street"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Street</FormLabel>
											<FormControl>
												<Textarea
													placeholder="flat 209, stark towers"
													{...field}
												/>
											</FormControl>

											<FormMessage />
										</FormItem>
									)}
								/>

								<div className="grid grid-cols-2 gap-4">
									<FormField
										control={form.control}
										name="fullName"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Full Name</FormLabel>
												<FormControl>
													<Input
														type="text"
														placeholder="John Doe"
														{...field}
													/>
												</FormControl>

												<FormMessage />
											</FormItem>
										)}
									/>
									<FormField
										control={form.control}
										name="city"
										render={({ field }) => (
											<FormItem>
												<FormLabel>City</FormLabel>
												<FormControl>
													<Input type="text" placeholder="Pune" {...field} />
												</FormControl>

												<FormMessage />
											</FormItem>
										)}
									/>
								</div>
								<div className="grid grid-cols-2 gap-4">
									<FormField
										control={form.control}
										name="state"
										render={({ field }) => (
											<FormItem>
												<FormLabel>State</FormLabel>
												<FormControl>
													<Input
														type="text"
														placeholder="Maharashtra"
														{...field}
													/>
												</FormControl>

												<FormMessage />
											</FormItem>
										)}
									/>
									<FormField
										control={form.control}
										name="country"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Country</FormLabel>
												<FormControl>
													<Input type="text" placeholder="India" {...field} />
												</FormControl>

												<FormMessage />
											</FormItem>
										)}
									/>
								</div>
								<div className="grid grid-cols-2 gap-4">
									<FormField
										control={form.control}
										name="postalCode"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Postal Code</FormLabel>
												<FormControl>
													<Input type="text" placeholder="442476" {...field} />
												</FormControl>

												<FormMessage />
											</FormItem>
										)}
									/>
									<FormField
										control={form.control}
										name="phoneNumber"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Phone Number</FormLabel>
												<FormControl>
													<Input
														type="text"
														placeholder="7245736210"
														{...field}
													/>
												</FormControl>

												<FormMessage />
											</FormItem>
										)}
									/>
								</div>
								{form.formState?.errors?.root?.serverError ? (
									<p className="text-destructive text-center">
										{form.formState?.errors?.root?.serverError.message}
									</p>
								) : null}
								<Button
									disabled={addressMutation.isPending}
									className="w-full"
									type="submit"
								>
									{addressMutation.isPending
										? "creating..."
										: "create new address"}
								</Button>
							</div>
						</form>
					</Form>
				</DialogContent>
			</Dialog>
		</Card>
	);
}
export default CreateAddressCard;
