import React, { useState } from "react";
import AddTaskForm from "../../components/AddTaskForm/AddTaskForm";
import TodoTitle from "../../components/TodoTitle/TodoTitle";
import styles from "./HomePage.module.scss";
import TaskList from "../../components/TaskList/TaskList";
import { Task } from "../../types";
import { v4 as uuidv4 } from "uuid";

const HomePage: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const addTask = (taskContent: string) => {
    const newTask: Task = {
      id: uuidv4(),
      content: taskContent,
      isCompleted: false,
    };

    setTasks([...tasks, newTask]);
  };

  return (
    <div className={styles["box"]}>
      <TodoTitle />
      <AddTaskForm onAddTask={addTask} />
      <TaskList tasks={tasks} />
    </div>
  );
};

export default HomePage;
