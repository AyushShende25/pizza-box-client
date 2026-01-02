import { Mail } from "lucide-react";
import { useLocation } from "react-router";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { useResendToken } from "@/api/authApi";
import { useEffect, useState } from "react";

function CheckEmail() {
	const location = useLocation();
	const email = location.state?.email;

	const resendToken = useResendToken();

	const [countdown, setCountdown] = useState(0);

	useEffect(() => {
		if (countdown > 0) {
			const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
			return () => clearTimeout(timer);
		}
	}, [countdown]);

	const handleResend = () => {
		if (email) {
			resendToken.mutate(email, {
				onSuccess: () => setCountdown(30),
			});
		}
	};

	return (
		<div className="flex flex-col items-center justify-center min-h-screen p-6">
			<div className="max-w-md w-full space-y-6">
				<Alert>
					<Mail className="h-4 w-4" />
					<AlertTitle>Check Your Email</AlertTitle>
					<AlertDescription>
						We've sent a verification link to <strong>{email}</strong>
						<br />
						Click the link in the email to verify your account.
					</AlertDescription>
				</Alert>

				<div className="space-y-2 text-sm text-muted-foreground">
					<p>Didn't receive the email?</p>
					<ul className="list-disc list-inside space-y-1">
						<li>Check your spam folder</li>
						<li>Make sure the email address is correct</li>
						<li>Wait a few minutes and try resending</li>
					</ul>
				</div>

				<Button
					variant="outline"
					className="w-full"
					onClick={handleResend}
					disabled={resendToken.isPending || countdown > 0}
				>
					{resendToken.isPending
						? "Sending..."
						: countdown > 0
							? `Resend in ${countdown}s`
							: "Resend Verification Email"}
				</Button>

				<p className="text-center text-sm">
					<a href="/login" className="text-primary hover:underline">
						Back to Login
					</a>
				</p>
			</div>
		</div>
	);
}

export default CheckEmail;
