import produce from "immer";
import create from "zustand";
import { devtools, persist } from "zustand/middleware";

interface LocationState {
	from: string;
	setFrom: (from: string) => void;
}

const useLocationStore = create<LocationState>()(
	persist(
		devtools(
			(set) => ({
				from: "",
				setFrom: (from) =>
					set(
						produce((state) => {
							state.from = from;
						}),
						false,
						"location/setFrom"
					),
			}),
			{ name: "location", serialize: { options: true } }
		),
		{
			name: "location", // unique name
			getStorage: () => sessionStorage, // (optional) by default, 'localStorage' is used
		}
	)
);

export default useLocationStore;
