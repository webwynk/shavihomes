import { Navigate } from "react-router-dom";

export const isAuthenticated = () => {
  return !!localStorage.getItem("admin_token");
};

const AdminAuth = ({ children }: { children: React.ReactNode }) => {
  if (!isAuthenticated()) {
    return <Navigate to="/admin/login" replace />;
  }

  return <>{children}</>;
};

export default AdminAuth;
