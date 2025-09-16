import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { Navigate, useNavigate } from "react-router";

const Login = () => {
  const { isLoading, isAuthenticated, login } = useAuth();
  const navigate = useNavigate();

  const [userid, setUserid] = useState("");
  const [username, setUsername] = useState("");

  const handleLogin = async () => {
    await login(userid, username);
    navigate("/dashboard");
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div>
      <form>
        <div>
          <label htmlFor="userid">Id</label>
          <input
            type="text"
            id="userid"
            onChange={(e) => setUserid(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="username">Name</label>
          <input
            type="text"
            id="username"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <button onClick={() => handleLogin()}>Login</button>
      </form>
    </div>
  );
};

export default Login;
