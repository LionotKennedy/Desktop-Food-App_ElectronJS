// src/pages/DashboardPage.tsx
import { useNavigate } from "react-router-dom";
import { Dashboard } from "./Dashboard";

export const DashboardPage = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  if (!user.username) {
    navigate("/login");
    return null;
  }

  return <Dashboard user={user} onLogout={handleLogout} />;
};