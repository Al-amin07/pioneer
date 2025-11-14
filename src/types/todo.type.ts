export interface ITodo {
  id: number;
  title: string;
  description: string;
  priority: "extreme" | "moderate" | "low";
  position: number;
  is_completed: boolean;
  todo_date: string;
  created_at: string;
  updated_at: string;
}
