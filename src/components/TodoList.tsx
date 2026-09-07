'use client'

import '@/i18n'
import { Todo } from "@/types/todo";
import { useTodos } from "@/hooks/useTodos";
import TodoCard from "./TodoCard";
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';

interface TodoListProps {
  tasks: Todo[];
  lng: string
  onToggleStatus: (id: string, currentStatus: boolean) => Promise<void>;
  onEdit: (id: string, data: Partial<Todo>) => Promise<void>;
  onDelete: (id: string) => Promise<void>;}

export default function TodoList({ tasks, lng, onToggleStatus, onDelete, onEdit }: TodoListProps) {

   const {t, i18n} = useTranslation()
  
      useEffect(() => {
      if(lng && i18n.language !== lng){
          i18n.changeLanguage(lng)
      }
      },[lng, i18n])

  if (tasks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center rounded-xl bg-gray-50 border border-dashed border-gray-300">
        <p className="text-sm font-medium text-gray-500">{t("notaskfound")}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3 w-full max-h-[500px] overflow-y-auto pr-2">
      {tasks.map((item) => (
        <TodoCard
          key={item.id}
          task={item}
          onToggleStatus={onToggleStatus}
          onEdit={onEdit}
          onDelete={onDelete}
          lng={lng}
        />
      ))}
    </div>
  );
}