import { LoginForm } from "../components/auth/LoginForm";

interface LoginProps {
  onLogin: (credentials: { username: string; password: string; role: string }) => void;
}

export const Login = ({ onLogin }: LoginProps) => {
  return <LoginForm onLogin={onLogin} />;
};