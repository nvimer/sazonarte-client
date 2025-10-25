import { Button } from "@/components";
import { useAuth } from "@/hooks";
import { useNavigate } from "react-router-dom";

const DashboardPage = () => {
  const { user, logout } = useAuth();

  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header*/}
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          Dashboard - Sazonarte
        </h1>
        <p className="text-gray-600 mb-8">
          Bienvenido a tu sistema de gestión de restaurante
        </p>

        {/*User Info Card*/}
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Sesión Activa
          </h2>

          <div>
            <div>
              <span className="text-gray-900">{user?.name}</span>
            </div>
            <div>
              <span className="text-gray-900">{user?.email}</span>
            </div>
            <div>
              <span className="text-gray-900">
                {user?.phone || "No registrado"}
              </span>
            </div>
          </div>

          {user?.profile && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                Perfil
              </h3>
              <div className="flex items-center">
                <span className="font-medium text-gray-700 w-24">
                  Dirección:
                </span>
                <span className="text-gray-900">
                  {" "}
                  {user.profile.address || "No registrada"}
                </span>
              </div>
            </div>
          )}

          {/* Logout Button*/}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <button
              onClick={logout}
              className="w-full sm:w-auto px-6 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors duration-200"
            >
              Cerrar Sesión
            </button>
          </div>

          {/* Navigation to modules */}
          <div>
            <h3>Módulos</h3>
            <Button onClick={() => navigate("/tables")}>Gestionar Mesas</Button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default DashboardPage;
