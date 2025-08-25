import { Toaster } from "./components/ui/toaster";
import { Toaster as Sonner } from "./components/ui/sonner";
import { TooltipProvider } from "./components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { LoginPage } from "./pages/LoginPage";
import { DashboardPage } from "./pages/DashboardPage";
import { CategoryDetailPage } from "./pages/CategoryDetailPage";
import NotFound from "./pages/NotFound";
import { MainLayout } from "./layouts/MainLayout";

const queryClient = new QueryClient();

const App = () => {
  // lecture simple depuis localStorage (ou Context plus tard)
  const user = JSON.parse(localStorage.getItem("user") || "null");

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Routes publiques */}
            <Route
              path="/login"
              element={user ? <Navigate to="/dashboard" /> : <LoginPage />}
            />
            <Route
              path="/"
              element={user ? <Navigate to="/dashboard" /> : <LoginPage />}
            />

            {/* Routes protégées avec Layout commun */}
            <Route
              element={
                user ? (
                  <MainLayout
                    user={user}
                    onLogout={() => {
                      localStorage.removeItem("user");
                      window.location.href = "/login";
                    }}
                  />
                ) : (
                  <Navigate to="/login" />
                )
              }
            >
              <Route path="/dashboard" element={<DashboardPage />} />
              {/* <Route path="/category/:id" element={<CategoryDetailPage />} /> */}
              <Route
                path="/category/:packageId"
                element={<CategoryDetailPage />}
              />
              {/* Ajoute ici toutes les pages qui doivent garder le header */}
            </Route>

            {/* Fallback */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
