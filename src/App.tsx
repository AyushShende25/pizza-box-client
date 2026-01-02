import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { BrowserRouter, Route, Routes } from "react-router";
import NotFound from "@/components/NotFound";
import { Toaster } from "@/components/ui/sonner";
import AuthLayout from "@/layouts/AuthLayout";
import DefaultLayout from "@/layouts/DefaultLayout";
import ProtectedLayout from "@/layouts/ProtectedLayout";
import Address from "@/pages/Address";
import Cart from "@/pages/Cart";
import ForgotPassword from "@/pages/ForgotPassword";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Menu from "@/pages/Menu";
import Orders from "@/pages/Orders";
import Register from "@/pages/Register";
import ResetPassword from "@/pages/ResetPassword";
import VerifyEmail from "@/pages/VerifyEmail";
import WsProvider from "./providers/ws-provider";
import CheckEmail from "./pages/CheckEmail";

const queryClient = new QueryClient();
function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<WsProvider>
				<BrowserRouter>
					<Routes>
						<Route element={<DefaultLayout />}>
							<Route path="/" element={<Home />} />
							<Route path="/menu" element={<Menu />} />
							<Route path="/cart" element={<Cart />} />
							<Route element={<ProtectedLayout />}>
								<Route path="/orders" element={<Orders />} />
								<Route path="/address" element={<Address />} />
							</Route>
						</Route>
						<Route element={<AuthLayout />}>
							<Route path="/login" element={<Login />} />
							<Route path="/register" element={<Register />} />
							<Route path="/verify-email" element={<VerifyEmail />} />
							<Route path="/forgot-password" element={<ForgotPassword />} />
							<Route path="/reset-password" element={<ResetPassword />} />
							<Route path="/check-email" element={<CheckEmail />} />
						</Route>
						<Route path="*" element={<NotFound />} />
					</Routes>
					<Toaster />
				</BrowserRouter>
			</WsProvider>
			<ReactQueryDevtools initialIsOpen={false} />
		</QueryClientProvider>
	);
}

export default App;
