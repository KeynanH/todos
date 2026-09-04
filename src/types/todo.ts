
export interface Todo{
    id: string;
    title: string;
    completed: boolean;
    description?: string | null;
    dueDate?: string | null;
}

export interface TodoFormData {
  title: string;
  description?: string;
  dueDate?: string;
  completed?: boolean;
}