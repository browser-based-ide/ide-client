import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./app.component";
import Auth from "./auth/auth.component";
import Login from "./auth/login.component";
import Logout from "./auth/logout.component";

import { Editor } from "./editor";
import PrivateRoute from "./shared/components/private-route.component";

function AppRouter() {
	return (
		<BrowserRouter>
			<Routes>
				<Route element={<App />}>
					<Route element={<Auth />}>
						<Route index element={<Login />} />
						{/*  make login permission AKA protected routes */}
						<Route element={<PrivateRoute />}>
							<Route path="/editor" element={<Editor />} />
							<Route path="/logout" element={<Logout />} />
						</Route>
					</Route>

					<Route path="*" element={<h1>404</h1>} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
}

export default AppRouter;
