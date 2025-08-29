import { Outlet } from "react-router";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";

export default function DefaultLayout() {
	return (
		<div className="min-h-screen flex flex-col">
			<Navbar />
			<main className="flex-1">
				<Outlet />
			</main>
			<Footer />
		</div>
	);
}
