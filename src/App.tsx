import { useAuth } from "./hooks";
import LoginPage from "./pages/LoginPage";

const App = () => {
  const { user, isAuthenticated, isLoading, logout } = useAuth();

  if (isLoading) {
    return (
      <div>
        <div>Cargando...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <LoginPage />;
  }

  return (
    <div>
      <h1>Bienvenido a Sazonarte</h1>
    </div>
  );
};

export default App;
