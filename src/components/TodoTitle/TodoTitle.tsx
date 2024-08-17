import { Typography } from "@mui/material";
import React from "react";

interface TodoTitleProps {}

const TodoTitle: React.FC<TodoTitleProps> = () => {
  return (
    <Typography variant="h5" color="primary" fontWeight={700}>
      To-Do List &#x1F4DD;
    </Typography>
  );
};

export default TodoTitle;
