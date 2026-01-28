import { LoadingOutlined } from "@ant-design/icons";
import { useEffect, type ReactNode } from "react";
import { useLocation, useNavigate } from "react-router";

export default function AuthGuard({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      navigate(location.state?.from || "/", { replace: true });
    }
  }, [token, navigate, location]);

  if (token) {
    return (
      <div className="min-h-[calc(100vh-70px)] flex items-center justify-center text-5xl text-primary-600">
        <LoadingOutlined/>
      </div>
    );
  }

  return children;
}
