import NoTask from "../components/NoTask";
import { useTask } from "../hooks/useTask";
import TaskList from "../components/TaskList";
import CompletedTasks from "../components/CompletedTasks";
import LatestTasks from "../components/LatestTasks";
import TaskChart from "../components/TaskChart";
import InfoWrapper from "../components/ui/InfoWrapper";
import Navbar from "../components/Navbar";
import styled from "styled-components";

const Container = styled.div`
  height: 100%;
  background: #f4f4f6;
`;

const Layout = styled.div`
  @media (min-width: 769px) {
    max-width: 960px;
    margin-inline: auto;
  }
`;

const Dashboard = () => {
  const {
    allTasks,
    completedTask,
    latestTask,
    loading,
    addTask,
    deleteTask,
    toggleTask,
  } = useTask();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <Navbar />
      <Layout>
        {allTasks.length === 0 ? (
          <NoTask />
        ) : (
          <>
            <InfoWrapper>
              <CompletedTasks
                allTasks={allTasks}
                completedTask={completedTask}
              />
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
      </Layout>
    </Container>
  );
};

export default Dashboard;
