import { Typography } from "@mui/material";
import React from "react";

const TodoTitle: React.FC = () => {
  return (
    <Typography variant="h5" color="primary" fontWeight={700}>
      To-Do List &#x1F4DD;
    </Typography>
  );
};

export default TodoTitle;
