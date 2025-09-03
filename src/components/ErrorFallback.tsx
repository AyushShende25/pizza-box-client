import { AlertTriangleIcon } from "lucide-react";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

function ErrorFallback({
	error,
	resetErrorBoundary,
}: {
	error: Error;
	resetErrorBoundary: () => void;
}) {
	const isDev = process.env.NODE_ENV !== "production";
	return (
		<div className="mt-16 flex justify-center p-4">
			<div className="w-full max-w-md">
				<Alert variant="destructive">
					<AlertTriangleIcon />
					<AlertTitle>Oops! something went wrong</AlertTitle>
					<AlertDescription>
						We're sorry, but we encountered an unexpected error.
					</AlertDescription>
				</Alert>
				<div className="mt-4 space-y-4">
					<Button
						onClick={resetErrorBoundary}
						variant="outline"
						className="w-full cursor-pointer"
					>
						Return to Homepage
					</Button>
					{isDev ? (
						<Accordion type="single" collapsible className="w-full">
							<AccordionItem value="error-details">
								<AccordionTrigger>View error details</AccordionTrigger>
								<AccordionContent>
									<div className="rounded-md bg-muted p-4">
										<h3 className="mb-2 font-semibold">Error Message:</h3>
										<p className="mb-4 text-sm">{error.message}</p>
										<h3 className="mb-2 font-semibold">Stack Trace:</h3>
										<pre className="overflow-x-auto whitespace-pre-wrap text-xs">
											{error.stack}
										</pre>
									</div>
								</AccordionContent>
							</AccordionItem>
						</Accordion>
					) : null}
				</div>
			</div>
		</div>
	);
}
export default ErrorFallback;
