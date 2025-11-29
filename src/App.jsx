import { useState, useEffect } from "react";
import { useGoogleLogin } from "@react-oauth/google";

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

  // Google login (frontend)
  const loginWithGoogle = useGoogleLogin({
  onSuccess: async (googleTokenResponse) => {
    console.log("FULL Google response:", googleTokenResponse);
    try {
      const res = await fetch(
        "https://student-backend-lqcc.onrender.com/auth/google",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ access_token: googleTokenResponse.access_token }),
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
  },
  onError: () => {
    setError("Google login failed");
  },
});

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

        {/* Google sign-in button */}
        <button
  onClick={() => loginWithGoogle()}
  style={{
    width: "100%",
    padding: "0.75rem 1rem",
    background: "white",              // ✅ White background
    color: "#000",                     // ✅ Black text
    border: "1px solid #dadce0",       // ✅ Light gray border
    borderRadius: "8px",               // ✅ Rounded corners
    fontSize: "14px",
    fontWeight: "500",
    display: "flex",
    alignItems: "center",              // ✅ Perfectly centered
    justifyContent: "center",          // ✅ Horizontally centered
    gap: "12px",
    cursor: "pointer",
    boxShadow: "0 1px 3px rgba(0,0,0,0.1)",  // ✅ Subtle shadow
  }}
>
  <img 
    src="https://developers.google.com/identity/images/g-logo.png" 
    alt="Google" 
    style={{width: "18px", height: "18px"}}
  />
  Continue with Google
</button>


      </div>
    </div>
  );
}

export default App;
