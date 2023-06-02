import React from "react";
import { useAuthStore } from "../../../store";

function useUserInfo() {
	const user = useAuthStore((state) => state.user);
	return React.useMemo(() => user, [user]);
}

export default useUserInfo;
