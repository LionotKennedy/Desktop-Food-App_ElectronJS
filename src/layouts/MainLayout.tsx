import { Outlet, useNavigate } from "react-router-dom";
import { Header } from "../components/dashboard/Header";

interface MainLayoutProps {
  user: { username: string; role: string };
  onLogout: () => void;
}

export const MainLayout = ({ user, onLogout }: MainLayoutProps) => {
  return (
    <div className="min-h-screen bg-background">
      <Header user={user} onLogout={onLogout} />
      <Outlet />   {/* ← ici s’affichent les pages enfants */}
    </div>
  );
};