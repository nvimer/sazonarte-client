import { useAuth } from "@/hooks";
import { useState, type FormEvent } from "react";

const LoginPage = () => {
  // Hook to access the contexts login function
  const { login } = useAuth();

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

      console.log("✅  Login Succesfully");

      alert("Login Succesfully!");
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
    <div style={{ maxWidth: "400px", margin: "50px", padding: "20px" }}>
      <h1>Iniciar Sesión</h1>
      <p style={{ color: "#666" }}>SazonArte - Gestión de Restaurante</p>

      {/* Email input field */}
      <form onSubmit={handleSubmit} style={{ marginTop: "30px" }}>
        <div style={{ marginBottom: "20px" }}>
          <label
            htmlFor="email"
            style={{ display: "block", marginBottom: "5px" }}
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="tu@email.com"
            disabled={isLoading}
            style={{
              width: "100x",
              padding: "10px",
              fontSize: "16px",
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
          />
        </div>

        {/* Password input field */}
        <div style={{ marginTop: "20px" }}>
          <label
            htmlFor="password"
            style={{ display: "block", marginBottom: "5px" }}
          >
            Contraseña
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            disabled={isLoading}
            style={{
              width: "100x",
              padding: "10px",
              fontSize: "16px",
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
          />
        </div>

        {error && (
          <div
            style={{
              padding: "10px",
              marginBottom: "20px",
              backgroundColor: "#fee",
              color: "#c00",
              border: "1px solid #fcc",
              borderRadius: "4px",
            }}
          >
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading}
          style={{
            width: "100%",
            padding: "12px",
            fontSize: "16px",
            fontWeight: "bold",
            color: "white",
            backgroundColor: isLoading ? "#ccc" : "#007bff",
            border: "none",
            borderRadius: "4px",
            cursor: isLoading ? "not-allowed" : "pointer",
          }}
        >
          {isLoading ? "Iniciando Sesión..." : "Iniciar Sesión"}
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
