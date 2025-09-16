import { useNavigate } from "react-router";
import { useAuth } from "../hooks/useAuth";

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div>
      <nav>
        <div>Avatar</div>
        <div>{user?.username}</div>
        <button onClick={() => handleLogout()}>Logout</button>
      </nav>
      This is dashboard
    </div>
  );
};

export default Dashboard;
