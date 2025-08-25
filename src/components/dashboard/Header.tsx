import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Hotel, LogOut, User, Clock } from "lucide-react";

interface HeaderProps {
  user: {
    username: string;
    role: string;
  };
  onLogout: () => void;
}

export const Header = ({ user, onLogout }: HeaderProps) => {
  const currentTime = new Date().toLocaleTimeString('fr-FR', {
    hour: '2-digit',
    minute: '2-digit'
  });
  
  const getRoleBadgeVariant = (role: string) => {
    switch (role) {
      case 'ADMIN': return 'destructive';
      case 'MANAGER': return 'default';
      default: return 'secondary';
    }
  };

  return (
    <header className="bg-card border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo et titre */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
              <Hotel className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">HÔTEL SOAVADIA</h1>
              <p className="text-sm text-muted-foreground">Système de commande</p>
            </div>
          </div>

          {/* Centre - Heure */}
          <div className="hidden sm:flex items-center space-x-2 text-muted-foreground">
            <Clock className="w-4 h-4" />
            <span className="text-sm font-medium">{currentTime}</span>
          </div>

          {/* Droite - Utilisateur et déconnexion */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <User className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm font-medium text-foreground">{user.username}</span>
              <Badge variant={getRoleBadgeVariant(user.role)} className="text-xs">
                {user.role}
              </Badge>
            </div>
            
            <Button 
              variant="ghost" 
              size="sm"
              onClick={onLogout}
              className="text-muted-foreground hover:text-foreground"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline ml-2">Déconnexion</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};