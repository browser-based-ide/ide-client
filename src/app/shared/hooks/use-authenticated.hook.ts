import React from "react";
import { useAuthStore } from "../../../store";

function useAuthenticated() {
  const token = useAuthStore((state) => state.token);
  return React.useMemo(() => !!token, [token]);
}

export default useAuthenticated;
