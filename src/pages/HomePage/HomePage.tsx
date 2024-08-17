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

  const deleteTask = (id: string) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
  };

  const toggleTask = (id: string) => {
    setTasks((prevTasks) => prevTasks.map((task) => (task.id === id ? { ...task, isCompleted: !task.isCompleted } : task)));
  };

  return (
    <div className={styles["box"]}>
      <TodoTitle />
      <AddTaskForm onAddTask={addTask} />
      <TaskList tasks={tasks} deleteTask={deleteTask} toggleTask={toggleTask} />
    </div>
  );
};

export default HomePage;
