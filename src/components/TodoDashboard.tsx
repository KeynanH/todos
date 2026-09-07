'use client'

import '@/i18n'
import { useEffect, useState } from "react";
import TodoCalendar from "./TodoCalendar";
import TodoList from "./TodoList";
import TodoModal from "./TodoModal";
import TodoForm from "./TodoForm";
import { useRouter } from "next/navigation";
import { useTodos } from "@/hooks/useTodos";
import Header from "./header";
import { useTranslation } from 'react-i18next';

interface TodoDashboardProps {
    session: any
    lng: string
}


export default function TodoDashboard({session, lng}: TodoDashboardProps){
    const [isOpen, setIsOpen] = useState(false)
    const router = useRouter()

    const {tasks, isLoading, refreshTodos } = useTodos();

    const {t, i18n} = useTranslation()

    useEffect(() => {
    if(lng && i18n.language !== lng){
        i18n.changeLanguage(lng)
    }
    },[lng, i18n])

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
      <Header  lng={lng}/> 
      <main className="flex flex-1 w-full flex-col items-center justify-between p-16 bg-gray-200 sm:items-start">
        <div className="py-4 flex flex-col items-center justify-center">
            <button
                className="rounded-md bg-black items-center text-center w-3xl px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 transition-colors"    
                onClick={() => setIsOpen(true)}>
                   {t("addtodo")}
            </button>
            <TodoModal
                open={isOpen}
                onClose={() => setIsOpen(false)}
                title={t("addtodo")}
            >
                <TodoForm  onSubmit={handleTodoSubmit} lng={lng} />
            </TodoModal>
        </div>
        {isLoading ? (
            <div className="flex flex-col item-center justify-center text-center py-12 text-gray-600 font-medium">
                {t("loadingworkspace")}
            </div>
        ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start w-full">
                <TodoList tasks={tasks} />
                <TodoCalendar tasks={tasks}/> 
            </div>
        )}
      </main>
    </div>
  );
}