import { useState, useEffect, useCallback, useMemo } from "react";
import type { Task } from "../types/task";
import { apiDelay } from "../utils";

export const useTask = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const loadTasks = async () => {
      try {
        setLoading(true);

        await apiDelay();

        const storedTasks = localStorage.getItem("tasks");
        if (storedTasks) {
          const parsedTasks = JSON.parse(storedTasks);
          const tasksWithDates = parsedTasks.map((task: any) => ({
            ...task,
            createdAt: new Date(task.createdAt),
            updatedAt: new Date(task.updatedAt),
          }));
          setTasks(tasksWithDates);
        }
      } catch (err) {
        console.error("Failed to load tasks:", err);
        localStorage.removeItem("tasks");
      } finally {
        setLoading(false);
      }
    };

    loadTasks();
  }, []);

  const saveTasks = async (newTasks: Task[]) => {
    try {
      console.log(tasks.map((t) => t.title));

      localStorage.setItem("tasks", JSON.stringify(newTasks));
    } catch (err) {
      console.error("Failed to save tasks:", err);
    }
  };

  // Auto-save when tasks change
  useEffect(() => {
    if (!loading && tasks.length >= 0) {
      saveTasks(tasks);
    }
  }, [tasks, loading, saveTasks]);

  const generateId = (): string => {
    return Date.now().toString();
  };

  const addTask = (taskTitle: string): boolean => {
    try {
      const newTask: Task = {
        id: generateId(),
        title: taskTitle.trim(),
        isCompleted: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      console.log(newTask);

      setTasks((prevTasks) => [newTask, ...prevTasks]);
      setSearchQuery("");
      return true;
    } catch (err) {
      console.error("Failed to add task");
      return false;
    }
  };

  // Update task
  const updateTask = (
    id: string,
    updates: Partial<Omit<Task, "id" | "createdAt">>
  ): boolean => {
    try {
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === id ? { ...task, ...updates, updatedAt: new Date() } : task
        )
      );
      return true;
    } catch (err) {
      console.error("Failed to update task");
      return false;
    }
  };

  const deleteTask = (id: string): boolean => {
    try {
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
      return true;
    } catch (err) {
      console.error("Failed to delete task");
      return false;
    }
  };

  const toggleTask = (id: string): void => {
    updateTask(id, {
      isCompleted: !tasks.find((t) => t.id === id)?.isCompleted,
    });
  };

  // Search tasks
  const searchTasks = (searchTerm: string): Task[] => {
    if (!searchTerm.trim()) return tasks;

    return tasks.filter((task) =>
      task.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const filteredTasks = useMemo(() => {
    return searchTasks(searchQuery);
  }, [searchTasks, searchQuery]);

  const getTaskById = useCallback(
    (id: string): Task | undefined => {
      return tasks.find((task) => task.id === id);
    },
    [tasks]
  );

  const completedTask = tasks.filter((task) => task.isCompleted);

  const LATEST_COUNT = 3;
  const latestTask = tasks
    .sort((a, b) => b.createdAt.valueOf() - a.createdAt.valueOf())
    .slice(0, LATEST_COUNT);

  return {
    tasks: filteredTasks,
    allTasks: tasks,
    loading,
    searchQuery,
    completedTask,
    latestTask,

    addTask,
    updateTask,
    deleteTask,
    toggleTask,
    setSearchQuery,
    getTaskById,
  };
};
