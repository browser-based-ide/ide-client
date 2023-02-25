import { Auth0Provider } from "@auth0/auth0-react";
import { Outlet } from "react-router-dom";

const Auth: React.FC = () => {
	return (
		<Auth0Provider
			domain={process.env.REACT_APP_AUTH0_DOMAIN}
			clientId={process.env.REACT_APP_AUTH0_CLIENT_ID}
			authorizationParams={{
				redirect_uri: window.location.origin,
			}}>
			<Outlet />
		</Auth0Provider>
	);
};

export default Auth;
