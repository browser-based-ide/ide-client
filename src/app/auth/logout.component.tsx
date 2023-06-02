import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthStore } from "../../store";

const Logout: React.FC = () => {
	const { logout: Auth0Signout } = useAuth0();
	const setAuthState = useAuthStore((state) => state.setAuthState);

	React.useEffect(() => {
		setAuthState();
		setTimeout(() => {
			Auth0Signout({
				logoutParams: {
					returnTo: process.env.REACT_APP_LOGOUT_REDIRECT_URL,
				},
			});
		}, 0);
		localStorage.clear();
		sessionStorage.clear();
		<Navigate to="/" />;
	}, [Auth0Signout, setAuthState]);

	return <Navigate to="/" />;
};

export default Logout;
