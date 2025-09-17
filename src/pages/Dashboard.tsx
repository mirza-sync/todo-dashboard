import { useNavigate } from "react-router";
import { useAuth } from "../hooks/useAuth";
import NoTask from "../components/NoTask";
import { useTask } from "../hooks/useTask";
import TaskList from "../components/TaskList";
import CompletedTasks from "../components/CompletedTasks";
import LatestTasks from "../components/LatestTasks";
import TaskChart from "../components/TaskChart";
import InfoWrapper from "../components/ui/InfoWrapper";

const Dashboard = () => {
  const { user, logout } = useAuth();
  const {
    allTasks,
    completedTask,
    latestTask,
    loading,
    addTask,
    deleteTask,
    toggleTask,
  } = useTask();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div
      style={{
        height: "100%",
        background: "#F4F4F6 0% 0% no-repeat padding-box",
      }}
    >
      <nav>
        <div>Avatar</div>
        <div>{user?.username}</div>
        <button onClick={() => handleLogout()}>Logout</button>
      </nav>
      {allTasks.length === 0 ? (
        <NoTask />
      ) : (
        <>
          <InfoWrapper>
            <CompletedTasks allTasks={allTasks} completedTask={completedTask} />
            <LatestTasks allTasks={latestTask} />
            <TaskChart
              taskCount={allTasks.length}
              completedCount={completedTask.length}
            />
          </InfoWrapper>
          <TaskList
            allTasks={allTasks}
            toggleTask={toggleTask}
            addTask={addTask}
            deleteTask={deleteTask}
          />
        </>
      )}
    </div>
  );
};

export default Dashboard;
