import { Navigate, Outlet } from "react-router";
import { useMe } from "@/api/authApi";
import Spinner from "@/components/Spinner";

function AuthLayout() {
	const { data: user, isPending } = useMe();

	if (isPending) return <Spinner />;
	if (user) return <Navigate to="/" replace />;
	return <Outlet />;
}
export default AuthLayout;
