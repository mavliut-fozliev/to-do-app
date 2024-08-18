import React from "react";
import { Button, ButtonGroup } from "@mui/material";
import { TaskFilter } from "../../types";
import styles from "./TaskFilterControls.module.scss";

interface TaskFilterControlsProps {
  currentFilter: TaskFilter;
  onFilterChange: (filter: TaskFilter) => void;
  onClearCompleted: () => void;
}

const TaskFilterControls: React.FC<TaskFilterControlsProps> = ({ currentFilter, onFilterChange, onClearCompleted }) => {
  const getFilterButton = (filter: TaskFilter) => (
    <Button onClick={() => onFilterChange(filter)} color={currentFilter === filter ? "primary" : "inherit"}>
      {filter}
    </Button>
  );

  return (
    <div className={styles["box"]}>
      <ButtonGroup variant="text" aria-label="task filter buttons">
        {Object.values(TaskFilter).map((filter) => getFilterButton(filter))}
      </ButtonGroup>
      <Button variant="outlined" color="secondary" onClick={onClearCompleted}>
        Clear Completed
      </Button>
    </div>
  );
};

export default TaskFilterControls;
