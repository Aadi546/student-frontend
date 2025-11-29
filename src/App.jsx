import { useState, useEffect } from "react";

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [token, setToken] = useState("");

  useEffect(() => {
    const savedToken = localStorage.getItem("jwtToken");
    if (savedToken) setToken(savedToken);
  }, []);

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

  const handleLogout = () => {
    setToken("");
    localStorage.removeItem("jwtToken");
  };

  if (token) {
    return (
      <div style={{ padding: "2rem", maxWidth: "400px", margin: "0 auto" }}>
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
            <label style={{ display: "block", marginBottom: "0.5rem" }}>Username:</label>
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
            <label style={{ display: "block", marginBottom: "0.5rem" }}>Password:</label>
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

          {error && <p style={{ color: "red", marginBottom: "1rem" }}>{error}</p>}

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

        {/* ✅ FINAL GOOGLE BUTTON - 100% VER CEL COMPATIBLE */}
        <div style={{ marginTop: "1rem" }}>
          <button
            onClick={() => window.open('https://student-backend-lqcc.onrender.com/auth/google', '_blank', 'width=500,height=600')}
            style={{
              width: "100%",
              padding: "12px 16px",
              background: "#fff",
              color: "#1a73e8",
              border: "1px solid #dadce0",
              borderRadius: "8px",
              fontSize: "14px",
              fontWeight: 500,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "12px",
              cursor: "pointer",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" style={{ flexShrink: 0 }}>
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continue with Google
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
