import React, { useState } from "react";
import AddTaskForm from "../../components/AddTaskForm/AddTaskForm";
import TodoTitle from "../../components/TodoTitle/TodoTitle";
import styles from "./HomePage.module.scss";

const HomePage = () => {
  const [tasks, setTasks] = useState<string[]>([]);

  const addTask = (taskContent: string) => {
    setTasks([...tasks, taskContent]);
  };

  return (
    <div className={styles["box"]}>
      <TodoTitle />
      <AddTaskForm onAddTask={addTask} />
    </div>
  );
};

export default HomePage;
