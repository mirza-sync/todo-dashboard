import { useRef, useEffect, useState } from "react";
import type { Task } from "../../types/task";
import Button from "../ui/Button";
import "./styles.css";

interface TaskDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (taskTitle: string) => void;
  task?: Task;
}

const TaskDialog: React.FC<TaskDialogProps> = ({
  isOpen,
  onClose,
  onSubmit,
  task,
}) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [title, setTitle] = useState(task?.title || "");

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      dialog.showModal();
    } else {
      dialog.close();
    }

    return () => {
      if (dialog.open) dialog.close();
    };
  }, [isOpen]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const handleClose = () => {
      onClose();
    };

    dialog.addEventListener("close", handleClose);

    return () => {
      dialog.removeEventListener("close", handleClose);
    };
  }, [onClose]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      alert("Please enter a task title");
      return;
    }

    onSubmit(title.trim());

    setTitle("");
    onClose();
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const rect = dialog.getBoundingClientRect();
    if (
      e.clientX < rect.left ||
      e.clientX > rect.right ||
      e.clientY < rect.top ||
      e.clientY > rect.bottom
    ) {
      onClose();
    }
  };

  return (
    <dialog
      ref={dialogRef}
      className="task-dialog"
      onClick={handleBackdropClick}
    >
      <form onSubmit={handleSubmit} className="task-form">
        <div className="dialog-title">{task ? "Edit Task" : "+ New Task"}</div>

        <input
          id="task-title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Task Name"
          autoFocus
          required
          className="dialog-input"
        />

        <Button type="submit" widthFull={true}>
          {task ? "Update Task" : "+ New Task"}
        </Button>
      </form>
    </dialog>
  );
};

export default TaskDialog;
