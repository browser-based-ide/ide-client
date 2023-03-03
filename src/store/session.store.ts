import produce from "immer";
import create from "zustand";
import { devtools, persist } from "zustand/middleware";

interface SessionState {
	sessionId: string;
	setSessionId: (sessionId: string) => void;
}

const useSessionStore = create<SessionState>()(
	persist(
		devtools(
			(set) => ({
				sessionId: "",

				setSessionId: (sessionId) =>
					set(
						produce((state) => {
							state.sessionId = sessionId;
						}),
						false,
						"session/setSessionId"
					),
			}),
			{ name: "session", serialize: { options: true } }
		),
		{
			name: "session", // unique name
			getStorage: () => sessionStorage, // (optional) by default, 'localStorage' is used
		}
	)
);

export default useSessionStore;
