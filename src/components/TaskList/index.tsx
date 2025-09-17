import { useState } from "react";
import Button from "../ui/Button";
import TaskDialog from "../TaskDialog";
import Trash from "../../icons/Trash";
import type { Task } from "../../types/task";
import Title from "../ui/Title";
import Card from "../ui/Card";
import styled from "styled-components";
import { breakpoints, useMediaQuery } from "../../hooks/useMediaQuery";

type TaskListProps = {
  allTasks: Task[];
  addTask: (title: string) => void;
  deleteTask: (id: string) => void;
  toggleTask: (id: string) => void;
};

const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 29px 1rem 1rem;
  background: #f4f4f6 0% 0% no-repeat padding-box;

  @media (min-width: 769px) {
    flex-direction: row;
    justify-content: space-between;
    padding-inline: 0;
    padding-bottom: 10px;
  }
`;

const SearchInput = styled.input`
  background: #d9dfeb 0% 0% no-repeat padding-box;
  border-radius: 8px;
  height: 40px;
  border: none;
  padding-inline: 1rem;
  width: -webkit-fill-available;
  margin-block: 8px;

  @media (min-width: 769px) {
    flex-direction: row;
    width: 244px;
    margin-right: 12px;
  }
`;

const TaskItem = styled.div`
  padding-block: 24px;
  display: flex;
  justify-content: space-between;

  &:not(:last-child) {
    border-bottom: 2px solid #e8e8e8;
  }
`;

const Checkbox = styled.input`
  width: 19px;
  height: 19px;
`;

const TaskList = ({
  allTasks,
  addTask,
  deleteTask,
  toggleTask,
}: TaskListProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const isMobile = useMediaQuery(breakpoints.mobile);

  return (
    <div>
      <TitleWrapper>
        <Title>Tasks</Title>
        <div>
          <SearchInput
            type="text"
            name="search"
            id="search"
            placeholder="Search by task name"
          />
          <Button widthFull={isMobile} onClick={() => setIsDialogOpen(true)}>
            + New Task
          </Button>
        </div>
      </TitleWrapper>
      <Card padding="0px 16px">
        {allTasks.map((task) => (
          <TaskItem key={task.id}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <Checkbox
                id={task.id}
                type="checkbox"
                checked={task.isCompleted}
                onChange={() => toggleTask(task.id)}
              />
              <label
                style={{
                  color: task.isCompleted ? "#537178" : "#5285EC",
                  textDecoration: task.isCompleted ? "line-through" : "",
                  marginLeft: "12px",
                  cursor: "pointer",
                }}
                htmlFor={task.id}
              >
                {task.title}
              </label>
            </div>
            <Button widthFull={false} ghost onClick={() => deleteTask(task.id)}>
              <Trash />
            </Button>
          </TaskItem>
        ))}
      </Card>
      <TaskDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onSubmit={addTask}
      />
    </div>
  );
};

export default TaskList;
