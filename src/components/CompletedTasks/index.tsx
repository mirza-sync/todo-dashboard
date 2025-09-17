import styled from "styled-components";
import type { Task } from "../../types/task";
import Card from "../ui/Card";
import Title from "../ui/Title";

type CompletedTasksProps = {
  allTasks: Task[];
  completedTask: Task[];
};

const Completed = styled.span`
  font: normal normal 500 64px/78px Montserrat;
  color: #5285ec;
`;

const Total = styled.span`
  font: normal normal medium 20px/24px Montserrat;
  color: #8f9ea2;
`;

const CompletedTasks = ({ allTasks, completedTask }: CompletedTasksProps) => {
  return (
    <Card>
      <Title>Tasks Completed</Title>
      <Completed>{completedTask.length}</Completed>{" "}
      <Total>/{allTasks.length}</Total>
    </Card>
  );
};

export default CompletedTasks;
