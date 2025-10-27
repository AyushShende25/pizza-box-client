import { Card } from "@/components/ui/card";
import { Plus } from "lucide-react";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import CreateAddressForm from "./CreateAddressForm";

function CreateAddressCard() {
	return (
		<Card>
			<Dialog>
				<DialogTrigger className="h-full">
					<div className="flex items-center justify-center w-full h-full text-muted-foreground hover:text-muted-foreground/50 cursor-pointer">
						<Plus className="size-16" />
					</div>
				</DialogTrigger>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Add new Address</DialogTitle>
					</DialogHeader>
					<CreateAddressForm />
				</DialogContent>
			</Dialog>
		</Card>
	);
}
export default CreateAddressCard;
