'use client'
import { Todo } from "@/types/todo";
import { useTodos } from "@/hooks/useTodos";
import TodoCard from "./TodoCard";

interface TodoListProps {
  tasks: Todo[];
}

export default function TodoList({ tasks }: TodoListProps) {
  const { toggleTodoStatus, removeTodo } = useTodos();

  if (tasks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center rounded-xl bg-gray-50 border border-dashed border-gray-300">
        <p className="text-sm font-medium text-gray-500">No tasks found. click "Add todo" to add some</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3 w-full max-h-[500px] overflow-y-auto pr-2">
      {tasks.map((item) => (
        <TodoCard
          key={item.id}
          task={item}
          onToggleStatus={toggleTodoStatus}
          onDelete={removeTodo}
        />
      ))}
    </div>
  );
}