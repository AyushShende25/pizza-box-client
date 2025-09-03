import { Loader, TriangleAlert } from "lucide-react";
import { useEffect } from "react";
import { useSearchParams } from "react-router";
import { useResendToken, useVerify } from "@/api/authApi";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

function VerifyEmail() {
	const [searchParams] = useSearchParams();
	const token = searchParams.get("token");
	const email = searchParams.get("email");

	const verify = useVerify();
	const resendToken = useResendToken();

	// biome-ignore lint/correctness/useExhaustiveDependencies: <call it once on mount>
	useEffect(() => {
		if (token) {
			verify.mutate(token);
		}
	}, []);

	const handleResendToken = () => {
		if (email) {
			resendToken.mutate(email);
		}
	};

	if (!token) {
		return (
			<div className="flex items-center justify-center h-screen p-6">
				<Alert className="max-w-sm" variant="destructive">
					<TriangleAlert />
					<AlertTitle>Invalid Link</AlertTitle>
					<AlertDescription>
						No verification token found in the URL.
					</AlertDescription>
				</Alert>
			</div>
		);
	}

	if (verify.isError) {
		return (
			<div>
				<div className="flex flex-col gap-6 items-center justify-center h-screen p-6">
					<Alert className="max-w-sm" variant="destructive">
						<TriangleAlert />
						<AlertTitle>Account Verification Failed</AlertTitle>
						<AlertDescription>Invalid or expired token.</AlertDescription>
					</Alert>
					{email && (
						<Button
							variant="default"
							size="lg"
							onClick={handleResendToken}
							disabled={resendToken.isPending}
						>
							{resendToken.isPending ? "Sending..." : "Resend Token"}
						</Button>
					)}
				</div>
			</div>
		);
	}

	return (
		<div className="flex items-center justify-center h-screen p-6">
			<Alert className="max-w-sm" variant="default">
				<Loader />
				<AlertTitle>Account Verification</AlertTitle>
				<AlertDescription>verifying your account please wait.</AlertDescription>
			</Alert>
		</div>
	);
}
export default VerifyEmail;
