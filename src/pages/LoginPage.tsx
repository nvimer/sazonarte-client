import { useAuth } from "@/hooks";
import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  // Hook to access the contexts login function
  const { login } = useAuth();

  const navigate = useNavigate();

  // Form states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // User Interface (UI) States
  // Error message to display (or null is no error)
  const [error, setError] = useState<string | null>(null);
  // Used to disable the button while submission
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Reset the previous error
    setError(null);

    if (!email || !password) {
      setError("All fields are required.");
      return;
    }

    // Start loading
    setIsLoading(true);

    try {
      // Try to perform the login
      await login({ email, password });

      // Navigate to home/dashboard
      navigate("/", { replace: true });
    } catch (error: any) {
      // If there is an error, it is displayed here.
      console.error("❌ Login Error", error);

      // Friendly Error message
      const errorMessage =
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Login Error. Verify your credentials";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      {/* Login Card*/}
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        {/* Title*/}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900">
            Restaurante Sazonarte
          </h1>
          <p className="mt-2 text-sm text-gray-600">Sistema de Gestión</p>
        </div>

        {/* Form*/}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email field*/}
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="text"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@mail.com"
              disabled={isLoading}
              className="w-full px-4 py-3 text-gray-900 placeholder-gray-400 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
              required
            />
          </div>

          {/* Password field*/}
          <div>
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              disabled={isLoading}
              className="w-full px-4 py-3 text-gray-900 placeholder-gray-400 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
              required
            />
          </div>

          {/* Error Message*/}
          {error && (
            <div className="p-4 text-sm text-red-700 bg-red-100 border border-red-200 rounded-lg">
              {/* Icon*/}
              <span className="font-semibold">Error:</span> {error}
            </div>
          )}

          {/* Submit Button*/}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full px-4 py-3 text-white bg-blue-600 rounded-lg font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200"
          >
            {isLoading ? "Iniciando Sesión..." : "Iniciar Sesión"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
