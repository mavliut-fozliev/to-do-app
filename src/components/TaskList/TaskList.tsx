import React from "react";
import { Task } from "../../types";
import { Checkbox, IconButton, List, ListItem, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

interface TaskListProps {
  tasks: Task[];
  deleteTask: (id: string) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, deleteTask }) => {
  return (
    <List>
      {tasks.map((task, index) => (
        <ListItem key={index} sx={{ py: 0, justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <Checkbox checked={task.isCompleted} />
            <Typography variant="body1" style={{ textDecoration: task.isCompleted ? "line-through" : "none" }}>
              {task.content}
            </Typography>
          </div>
          <IconButton onClick={() => deleteTask(task.id)}>
            <CloseIcon />
          </IconButton>
        </ListItem>
      ))}
    </List>
  );
};

export default TaskList;
