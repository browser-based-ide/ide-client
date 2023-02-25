import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { loggerService, networkService } from "../../services";
import { useAuthStore } from "../../store";
import { IUser } from "../interfaces";
import { useUser } from "../shared/hooks";

const Login: React.FC = () => {
	const appUser = useUser(),
		doesAppUserExist = !!appUser?.id,
		location = useLocation();

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

	// query service by email
	// if not exist, add app user
	React.useEffect(() => {
		if (doesAppUserExist || !authToken || !user) {
			return;
		}

		const getUser = async () => {
			try {
				const userEmail: string = user.email;
				const data = await networkService.get<IUser>(
					`user?email=${userEmail}`
				);

				setAuthUser(data);
			} catch (error) {
				loggerService.error(error);
			}

			// add app user if doesn't exist one
			if (!appUser) {
				const data = await networkService.post<IUser>("user", {
					active: true,
					email: user.email,
					firstName: user.name,
				});
				setAuthUser(data);
			}
		};

		void getUser();
	}, [user, authToken, doesAppUserExist, setAuthUser, appUser]);

	if (doesAppUserExist) {
		// const redirectUri = getAuthRedirect(serviceProvider.onboardingStatus)
		const redirectUri = "/editor";
		return <Navigate to={redirectUri} state={{ from: location }} replace />;
	}

	return null;
};

export default Login;
