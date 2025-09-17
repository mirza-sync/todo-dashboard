import { useState } from "react";
import Button from "../ui/Button";
import TaskDialog from "../TaskDialog";

const NoTask = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          paddingBlock: "37px",
          background: "#FFFFFF 0% 0% no-repeat padding-box",
          boxShadow: "0px 3px 6px #0000000A",
        }}
      >
        <span style={{ marginBottom: "20px", color: "#537178" }}>
          You have no task.
        </span>
        <Button onClick={() => setIsDialogOpen(true)}>+ New Task</Button>
      </div>

      <TaskDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onSubmit={() => null}
      />
    </>
  );
};

export default NoTask;
