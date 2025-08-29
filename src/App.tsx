import { Route, Routes } from "react-router";
import Home from "@/pages/Home";
import DefaultLayout from "./layouts/DefaultLayout";

function App() {
	return (
		<Routes>
			<Route element={<DefaultLayout />}>
				<Route path="/" element={<Home />} />
			</Route>
		</Routes>
	);
}

export default App;
