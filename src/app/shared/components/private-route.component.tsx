import { useAuth0 } from "@auth0/auth0-react";
import React, { useEffect, useState } from "react";
import { Navigate, Outlet, RouteProps, useLocation } from "react-router-dom";
import { useAuthenticated } from "../hooks";

const PrivateRoute: React.FC<RouteProps> = ({ children, ...rest }) => {
	const location = useLocation();
	const { isLoading } = useAuth0();
	const [showLoading, setShowLoading] = useState(true);
	const isAuthenticated = useAuthenticated();

	useEffect(() => {
		if (!isLoading) {
			setShowLoading(false);
		}
	}, [isLoading]);

	if (showLoading) {
		return (
			<div className="bg-dark w-full h-screen text-fuchsia-50 flex items-center justify-center flex-col gap-8">
				{" "}
				<div
					className="w-12 h-12 rounded-full animate-spin border-2 border-solid border-green-500 border-t-transparent"
					style={{ animationDuration: "0.5s" }}></div>
				<h1>LOADING</h1>
			</div>
		);
	}

	if (!isAuthenticated) {
		return <Navigate to="/" state={{ from: location }} replace />;
	}

	return <Outlet />;
};

export default PrivateRoute;
