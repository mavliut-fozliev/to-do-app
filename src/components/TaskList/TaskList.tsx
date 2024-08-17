import React from "react";
import { Task } from "../../types";
import { Checkbox, IconButton, List, ListItem, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import styles from "./TaskList.module.scss";

interface TaskListProps {
  tasks: Task[];
  deleteTask: (id: string) => void;
  toggleTask: (id: string) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, deleteTask, toggleTask }) => {
  return (
    <List>
      {tasks.map((task, index) => (
        <ListItem key={index.toString()} sx={{ py: 0, justifyContent: "space-between" }}>
          <div className={styles["list-item-content"]}>
            <Checkbox checked={task.isCompleted} onClick={() => toggleTask(task.id)} />
            <Typography variant="body1" style={{ textDecoration: task.isCompleted ? "line-through" : "none" }}>
              {task.content}
            </Typography>
          </div>
          <IconButton onClick={() => deleteTask(task.id)} size="small">
            <CloseIcon fontSize="small" />
          </IconButton>
        </ListItem>
      ))}
    </List>
  );
};

export default TaskList;
