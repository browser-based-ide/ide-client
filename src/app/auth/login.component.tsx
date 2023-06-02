import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { Navigate } from "react-router-dom";
import { networkService } from "../../services";
import { useAuthStore } from "../../store";
import { IUser } from "../interfaces";
import { useUser } from "../shared/hooks";

const Login: React.FC = () => {
	const appUser = useUser(),
		doesAppUserExist = !!appUser?.id;

	const [authToken, setAuthToken] = useAuthStore((state) => [
			state.token,
			state.setAuthToken,
		]),
		setAuthUser = useAuthStore((state) => state.setAuthUser),
		{ user, getIdTokenClaims, isLoading, loginWithRedirect } = useAuth0();

	React.useEffect(() => {
		if (doesAppUserExist || isLoading) {
			return;
		}

		if (!user) {
			loginWithRedirect();
			return;
		}

		const getAccessToken = async () => {
			const token = await getIdTokenClaims();
			setAuthToken(token.__raw);
		};

		void getAccessToken();
	});

	React.useEffect(() => {
		if (doesAppUserExist || !authToken || !user) {
			return;
		}

		const getUser = async () => {
			const userEmail: string = user.email;
			let appUser = await networkService.get<IUser>(
				`user?email=${userEmail}`
			);
			console.log(appUser);
			// add app user if doesn't exist one
			if (!appUser) {
				appUser = await networkService.post<IUser>("user", {
					active: true,
					email: user.email,
					firstName: user.name,
				});
			}

			setAuthUser(appUser);
		};

		void getUser();
	}, [user, authToken, doesAppUserExist, setAuthUser]);

	if (doesAppUserExist) {
		const redirectUri = "/dashboard";
		return <Navigate to={redirectUri} replace />;
	}

	return null;
};

export default Login;
