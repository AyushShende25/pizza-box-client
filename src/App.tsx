import { Route, Routes } from "react-router";
import Home from "@/pages/Home";
import DefaultLayout from "./layouts/DefaultLayout";
import Cart from "./pages/Cart";
import Menu from "./pages/Menu";
import Orders from "./pages/Orders";

function App() {
	return (
		<Routes>
			<Route element={<DefaultLayout />}>
				<Route path="/" element={<Home />} />
				<Route path="/menu" element={<Menu />} />
				<Route path="/cart" element={<Cart />} />
				<Route path="/orders" element={<Orders />} />
			</Route>
		</Routes>
	);
}

export default App;
