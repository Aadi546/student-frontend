import { useState, useEffect } from "react";
import { GoogleLogin } from "@react-oauth/google";  // ✅ CHANGED: GoogleLogin component

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [token, setToken] = useState("");

  // Load token from storage on app start
  useEffect(() => {
    const savedToken = localStorage.getItem("jwtToken");
    if (savedToken) setToken(savedToken);
  }, []);

  // Normal username/password login
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "https://student-backend-lqcc.onrender.com/auth/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, password }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setToken(data.token);
        localStorage.setItem("jwtToken", data.token);
        setError("");
      } else {
        setError(data.error || "Login failed");
      }
    } catch (error) {
      setError("Network error");
    }
  };

  // Logout function
  const handleLogout = () => {
    setToken("");
    localStorage.removeItem("jwtToken");
  };

  // Logged-in view
  if (token) {
    return (
      <div
        style={{
          padding: "2rem",
          maxWidth: "400px",
          margin: "0 auto",
        }}
      >
        <h1>✅ Logged In!</h1>
        <p>Welcome back! Token saved.</p>
        <button
          onClick={handleLogout}
          style={{
            width: "100%",
            padding: "0.75rem",
            background: "#dc3545",
            color: "white",
            border: "none",
            borderRadius: "10px",
          }}
        >
          Logout
        </button>
      </div>
    );
  }

  // Login form + Google button
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div style={{ padding: "2rem", maxWidth: "400px", width: "100%" }}>
        <h1>Welcome Student!</h1>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "1rem" }}>
            <label style={{ display: "block", marginBottom: "0.5rem" }}>
              Username:
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "0.75rem",
                border: "1px solid #df2c2cff",
                borderRadius: "10px",
              }}
            />
          </div>

          <div style={{ marginBottom: "1rem" }}>
            <label style={{ display: "block", marginBottom: "0.5rem" }}>
              Password:
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "0.75rem",
                border: "1px solid #df2c2cff",
                borderRadius: "10px",
              }}
            />
          </div>

          {error && (
            <p style={{ color: "red", marginBottom: "1rem" }}>{error}</p>
          )}

          <button
            type="submit"
            style={{
              width: "100%",
              padding: "0.75rem",
              background: "#007bff",
              color: "white",
              border: "none",
              borderRadius: "10px",
              marginBottom: "0.75rem",
            }}
          >
            Login
          </button>
        </form>

        {/* ✅ GOOGLELOGIN COMPONENT - REPLACES useGoogleLogin */}
        <GoogleLogin
          onSuccess={async (response) => {
            console.log("Google success:", response);
            try {
              const res = await fetch(
                "https://student-backend-lqcc.onrender.com/auth/google",
                {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ access_token: response.access_token }),
                }
              );
              const data = await res.json();
              if (res.ok) {
                setToken(data.token);
                localStorage.setItem("jwtToken", data.token);
                setError("");
              } else {
                setError(data.error || "Google login failed");
              }
            } catch (err) {
              setError("Google login failed");
            }
          }}
          onError={() => setError("Google login failed")}
          theme="outline"
          size="large"
          text="continue_with"
          shape="rectangular"
          width="100%"
          style={{
            marginTop: "0.75rem",
            width: "100%",
          }}
        />
      </div>
    </div>
  );
}

export default App;
