import React from "react";
import AppRouter from "./app/app-router.component";
import "./index.css";
import { createRoot } from "react-dom/client";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
	<React.StrictMode>
		<AppRouter />
	</React.StrictMode>
);
