export type Task = {
  id: string;
  content: string;
  isCompleted: boolean;
};

export enum TaskFilter {
  All = "all",
  Active = "active",
  Completed = "completed",
}
