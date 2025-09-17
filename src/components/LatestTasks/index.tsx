import styled from "styled-components";
import type { Task } from "../../types/task";
import Card from "../ui/Card";
import Title from "../ui/Title";

type LatestTasksProps = {
  allTasks: Task[];
};

const List = styled.ul`
  font: normal normal 500 14px/26px Montserrat;
  color: #8f9ea2;
  padding-left: 16px;
`;

const LatestTasks = ({ allTasks }: LatestTasksProps) => {
  return (
    <Card>
      <Title>Latest Created Tasks</Title>
      <List>
        {allTasks.map((task) => (
          <li
            key={task.id}
            style={{
              textDecoration: task.isCompleted ? "line-through" : "",
            }}
          >
            {task.title}
          </li>
        ))}
      </List>
    </Card>
  );
};

export default LatestTasks;
