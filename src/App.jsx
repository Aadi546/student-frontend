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

           <div style={{ marginTop: "1rem" }}>
      <button
        onClick={() => {
          window.open(`https://student-backend-lqcc.onrender.com/auth/google`, '_self');
        }}
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
    }}
  >
    <svg width="18" height="18" viewBox="0 0 24 24" style={{ flexShrink: 0 }}>
      {/* your SVG paths stay same */}
    </svg>
    Continue with Google
  </button>
</div>

      </div>
    </div>
  );
}

export default App;
