import { LoaderCircle } from "lucide-react";

function Spinner() {
	return (
		<div className="flex items-center justify-center my-10">
			<LoaderCircle
				strokeWidth={2}
				className="animate-spin size-20 text-primary"
			/>
		</div>
	);
}
export default Spinner;
