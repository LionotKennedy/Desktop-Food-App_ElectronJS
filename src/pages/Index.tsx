import { useState } from "react";
import { Login } from "./Login";
import { Dashboard } from "./Dashboard";

const Index = () => {
  const [user, setUser] = useState<{ username: string; role: string } | null>(null);

  const handleLogin = (credentials: { username: string; password: string; role: string }) => {
    setUser({ username: credentials.username, role: credentials.role });
  };

  const handleLogout = () => {
    setUser(null);
  };

  if (!user) {
    return <Login onLogin={handleLogin} />;
  }

  return <Dashboard user={user} onLogout={handleLogout} />;
};

export default Index;
