import { CheckCircle, Loader, TriangleAlert } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router";
import { useResendToken, useVerify } from "@/api/authApi";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

function VerifyEmail() {
	const [searchParams] = useSearchParams();
	const token = searchParams.get("token");
	const email = searchParams.get("email");

	const verify = useVerify();
	const resendToken = useResendToken();

	const [countdown, setCountdown] = useState(0);

	useEffect(() => {
		if (countdown > 0) {
			const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
			return () => clearTimeout(timer);
		}
	}, [countdown]);

	// biome-ignore lint/correctness/useExhaustiveDependencies: <call it once on mount>
	useEffect(() => {
		if (token) {
			verify.mutate(token);
		}
	}, []);

	const handleResendToken = () => {
		if (email) {
			resendToken.mutate(email, {
				onSuccess: () => setCountdown(30),
			});
		}
	};

	if (!token) {
		return (
			<div className="flex items-center justify-center h-screen p-6">
				<Alert className="max-w-md" variant="destructive">
					<TriangleAlert />
					<AlertTitle>Invalid Verification Link</AlertTitle>
					<AlertDescription>
						This verification link is invalid. Please use the link from your
						email or request a new verification email.
					</AlertDescription>
				</Alert>
			</div>
		);
	}

	if (verify.isPending) {
		return (
			<div className="flex items-center justify-center min-h-screen p-6">
				<Alert className="max-w-md">
					<Loader className="size-4 animate-spin" />
					<AlertTitle>Verifying Your Account</AlertTitle>
					<AlertDescription>
						Please wait while we verify your email address...
					</AlertDescription>
				</Alert>
			</div>
		);
	}

	if (verify.isSuccess) {
		return (
			<div className="flex flex-col items-center justify-center min-h-screen p-6 gap-6">
				<Alert className="max-w-md" variant="default">
					<CheckCircle className="h-4 w-4 text-green-600" />
					<AlertTitle>Email Verified Successfully!</AlertTitle>
					<AlertDescription>
						Your account has been verified. You can now log in.
					</AlertDescription>
				</Alert>
				<Link to="/login">
					<Button size="lg">Go to Login</Button>
				</Link>
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
						<AlertDescription>
							This verification link is invalid or has expired.
							{email && " Request a new verification email below."}
						</AlertDescription>
					</Alert>
					{email && (
						<div className="flex flex-col gap-3 w-full max-w-md">
							<Button
								variant="default"
								size="lg"
								onClick={handleResendToken}
								disabled={resendToken.isPending || countdown > 0}
								className="w-full"
							>
								{resendToken.isPending
									? "Sending..."
									: countdown > 0
										? `Resend in ${countdown}s`
										: "Resend Verification Email"}
							</Button>
							<Link to="/login">
								<Button variant="outline" size="lg" className="w-full">
									Back to Login
								</Button>
							</Link>
						</div>
					)}
				</div>
			</div>
		);
	}

	return null;
}
export default VerifyEmail;
