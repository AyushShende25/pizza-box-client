import { Navigate, Outlet } from "react-router";
import { useMe } from "@/api/authApi";
import Spinner from "@/components/Spinner";

function ProtectedLayout() {
	const { data: user, isPending, isError } = useMe();

	if (isPending) return <Spinner />;
	if (isError || !user) return <Navigate to="/login" replace />;
	return <Outlet />;
}
export default ProtectedLayout;
