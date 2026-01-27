import type { ReactNode } from "react";
import { Navigate } from "react-router";

interface Props {
  children: ReactNode;
}

export default function PrivateRoute({ children }: Props) {
  const token = localStorage.getItem("token");
  return token ? <>{children}</> : <Navigate to="/login" />;
}
