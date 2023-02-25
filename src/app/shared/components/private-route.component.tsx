import { useAuth0 } from "@auth0/auth0-react";
import React, { useEffect, useState } from "react";
import { Navigate, Outlet, RouteProps, useLocation } from "react-router-dom";

const PrivateRoute: React.FC<RouteProps> = ({ children, ...rest }) => {
	const location = useLocation();
	const { isAuthenticated, isLoading } = useAuth0();
	const [showLoading, setShowLoading] = useState(true);

	useEffect(() => {
		if (!isLoading) {
			setShowLoading(false);
		}
	}, [isLoading]);

	if (showLoading) {
		return <h1>Loading</h1>;
	}

	if (!isAuthenticated) {
		return <Navigate to="/" state={{ from: location }} replace />;
	}

	return <Outlet />;
};

export default PrivateRoute;
