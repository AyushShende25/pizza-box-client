import { createRoot } from "react-dom/client";
import "./index.css";

import { ErrorBoundary } from "react-error-boundary";
import App from "./App.tsx";
import ErrorFallback from "./components/ErrorFallback.tsx";

// biome-ignore lint/style/noNonNullAssertion: <html-root-element exists>
createRoot(document.getElementById("root")!).render(
	<ErrorBoundary
		FallbackComponent={ErrorFallback}
		onReset={() => window.location.replace("/")}
	>
		<App />
	</ErrorBoundary>,
);
