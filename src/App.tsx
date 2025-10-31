import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useAuth } from "./hooks";
import LoginPage from "./pages/LoginPage";
import { PrivateRoute } from "./components/PrivateRoute";
import DashboardPage from "./pages/DashboardPage";
// import ComponentsTestPage from "./pages/ComponentsTestPage";
import { TablesPage } from "./features/tables";
import { MenuPage } from "./features/menu/pages/MenuPages";
import { TestDesignPage } from "./pages/TestDesignPage";

const App = () => {
  const { isAuthenticated } = useAuth();

  return (
    <BrowserRouter>
      <Routes>
        {/* Public Route: Login*/}
        <Route
          path="/login"
          element={
            isAuthenticated ? <Navigate to="/" replace /> : <LoginPage />
          }
        />

        {/* Temporary test components page*/}
        {/*        <Route path="/test-components" element={<ComponentsTestPage />} />*/}

        {/* Temporary test page*/}
        <Route path="/test-design" element={<TestDesignPage />} />

        {/* Protected Route: Dashboeard (Home)*/}
        <Route
          path="/"
          element={
            <PrivateRoute>
              <DashboardPage />
            </PrivateRoute>
          }
        />

        {/* Tables module */}
        <Route
          path="/tables"
          element={
            <PrivateRoute>
              <TablesPage />
            </PrivateRoute>
          }
        />

        {/* Menu module */}
        <Route
          path="/menu"
          element={
            <PrivateRoute>
              <MenuPage />
            </PrivateRoute>
          }
        />

        {/* Fallback: Redirect to home or login*/}
        <Route
          path="*"
          element={<Navigate to={isAuthenticated ? "/" : "/login"} replace />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
