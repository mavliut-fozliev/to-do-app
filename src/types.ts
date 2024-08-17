export type Task = {
  id: string;
  content: string;
  isCompleted: boolean;
};

export enum TaskFilter {
  All = "all",
  Completed = "completed",
  Active = "active",
}
