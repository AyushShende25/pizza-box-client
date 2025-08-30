import { Route, Routes } from "react-router";
import Home from "@/pages/Home";
import DefaultLayout from "./layouts/DefaultLayout";
import Menu from "./pages/Menu";

function App() {
	return (
		<Routes>
			<Route element={<DefaultLayout />}>
				<Route path="/" element={<Home />} />
				<Route path="/menu" element={<Menu />} />
			</Route>
		</Routes>
	);
}

export default App;
