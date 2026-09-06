'use client'

import { useState } from "react";
import TodoCalendar from "./TodoCalendar";
import TodoList from "./TodoList";
import TodoModal from "./TodoModal";
import TodoForm from "./TodoForm";
import { useRouter } from "next/navigation";
import { useTodos } from "@/hooks/useTodos";
import Header from "./header";

export default function TodoDashboard({session}: {session: any}){
    const [isOpen, setIsOpen] = useState(false)
    const router = useRouter()

    const {tasks, isLoading, refreshTodos } = useTodos();

    const handleTodoSubmit = async (formData: { title: string; description?: string; dueDate?: string; completed?: boolean }) => {
        const res = await fetch("/api/todos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
        });

        if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || "Failed to create task");
        }

        router.refresh(); 
    };
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-gray-200 dark:bg-gray-900 font-sans text-black">  
      <Header /> 
      <main className="flex flex-1 w-full flex-col items-center justify-between p-16 bg-gray-200 sm:items-start">
        <div className="py-4 flex flex-col items-center justify-center">
            <button
                className="rounded-md bg-black items-center text-center w-3xl px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 transition-colors"    
                onClick={() => setIsOpen(true)}>
                    Add todo
            </button>
            <TodoModal
                open={isOpen}
                onClose={() => setIsOpen(false)}
                title="Add todo"
            >
                <TodoForm  onSubmit={handleTodoSubmit}/>
            </TodoModal>
        </div>
        {isLoading ? (
            <div className="text-center py-12 text-gray-600 font-medium">
                Loading your workspace...
            </div>
        ) : (
            /* 4. Display Content Layout passing live tasks to components */
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start w-full">
                <TodoList tasks={tasks} />
                <TodoCalendar tasks={tasks}/> 
            </div>
        )}
      </main>
    </div>
  );
}