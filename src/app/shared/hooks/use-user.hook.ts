import React from "react";
import { useAuthStore } from "../../../store";

function useUser() {
	const user = useAuthStore((state) => state.user);
	return React.useMemo(() => user, [user]);
}

export default useUser;
