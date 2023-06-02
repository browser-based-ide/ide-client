import produce from "immer";
import create from "zustand";
import { devtools, persist } from "zustand/middleware";
import { IAuthInfo, IUser } from "../app/interfaces";

interface AuthState {
	token: string;
	user: IUser;
	setAuthToken: (x: string) => void;
	setAuthState: (x?: IAuthInfo) => void;
	setAuthUser: (x: IUser) => void;
	updateAuthUser: (x: Partial<IUser>) => void;
}

const useAuthStore = create<AuthState>()(
	persist(
		devtools(
			(set) => ({
				token: "",
				user: {} as IUser,
				setAuthToken: (token) =>
					set(
						produce((state) => {
							state.token = token;
						}),
						false,
						"auth/setAuthToken"
					),
				setAuthUser: (user) =>
					set(
						produce((state) => {
							state.user = user;
						}),
						false,
						"auth/setAuthUser"
					),
				updateAuthUser: (changes) =>
					set(
						produce((state) => {
							state.user = { ...state.user, ...changes };
						}),
						false,
						"auth/updateAuthUser"
					),
				setAuthState: (data) =>
					set(
						produce((state) => {
							state.token = data?.token || null;
							state.user = data?.user || null;
						}),
						false,
						"auth/setAuthState"
					),
			}),
			{ name: "auth", serialize: { options: true } }
		),
		{
			name: "auth", // unique name
			getStorage: () => sessionStorage, // (optional) by default, 'localStorage' is used
		}
	)
);

export default useAuthStore;
