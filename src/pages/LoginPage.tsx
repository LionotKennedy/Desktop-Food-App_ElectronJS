// src/pages/LoginPage.tsx
import { LoginForm } from "../components/auth/LoginForm";

export const LoginPage = () => {
  const handleLogin = (credentials: {
    username: string;
    password: string;
    role: string;
  }) => {
    localStorage.setItem("user", JSON.stringify(credentials));
    window.location.href = "/dashboard"; // ✅ Redirection forcée
  };

  return <LoginForm onLogin={handleLogin} />;
};