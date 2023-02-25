import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { useAuthStore } from "../../store";

const Logout: React.FC = () => {
	const { logout: Auth0Signout } = useAuth0();
	const setAuthState = useAuthStore((state) => state.setAuthState);

	React.useEffect(() => {
		setAuthState();
		Auth0Signout({ logoutParams: { returnTo: window.location.origin } });
	}, [Auth0Signout, setAuthState]);

	return null;
};

export default Logout;
