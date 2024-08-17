import { Box, Button, TextField } from "@mui/material";
import React, { useState } from "react";

interface AddTaskFormProps {
  onAddTask: (taskContent: string) => void;
}

const AddTaskForm: React.FC<AddTaskFormProps> = ({ onAddTask }) => {
  const [taskContent, setTaskContent] = useState("");

  const handleInputChange = ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
    setTaskContent(value);
  };

  const handleAddTask = () => {
    const preparedTaskContent = taskContent.trim();
    if (!preparedTaskContent) return;

    onAddTask(preparedTaskContent);
    setTaskContent("");
  };

  return (
    <Box
      component="form"
      sx={{ display: "flex", alignItems: "center", gap: 2 }}
      onSubmit={(e) => {
        e.preventDefault();
        handleAddTask();
      }}
    >
      <TextField placeholder="Add your text" variant="outlined" size="small" value={taskContent} onChange={handleInputChange} fullWidth />
      <Button variant="contained" color="primary" type="submit">
        Add
      </Button>
    </Box>
  );
};

export default AddTaskForm;
