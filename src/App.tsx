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
    <div style={{ padding: "20px" }}>
      <h1>Bienvenido a Sazonarte</h1>
      <div
        style={{
          marginTop: "20px",
          padding: "20px",
          border: "1px solid #ccc",
          borderRadius: "8px",
        }}
      >
        <h2>Sesión Activa</h2>
        <p>
          <strong>Nombre:</strong> {user?.name}
        </p>
        <p>
          <strong>Email:</strong> {user?.email}
        </p>
        <p>
          <strong>Teléfono:</strong> {user?.phone}
        </p>

        {user?.profile && (
          <div>
            <h3>Perfil</h3>
            <p>
              <strong>Dirección:</strong>{" "}
              {user.profile.address || "No registrada"}
            </p>
            <p>
              <strong>Fecha de nacimiento:</strong>{" "}
              {user.profile.birthDate || "No registrada"}
            </p>
          </div>
        )}

        <button
          onClick={logout}
          style={{
            marginTop: "20px",
            padding: "10px 20px",
            backgroundColor: "#dc3545",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          Cerrar Sesion
        </button>
      </div>
    </div>
  );
};

export default App;
