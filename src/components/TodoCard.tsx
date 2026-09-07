"use client";

import '@/i18n'
import { Todo } from "@/types/todo";
import { useEffect, useState } from "react";
import { useTranslation } from 'react-i18next';

interface TodoCardProps {
  task: Todo;
  onToggleStatus: (id: string, currentStatus: boolean) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
  lng: string
}

export default function TodoCard({ task, onToggleStatus, onDelete, lng }: TodoCardProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  const {t, i18n} = useTranslation()

    useEffect(() => {
    if(lng && i18n.language !== lng){
        i18n.changeLanguage(lng)
    }
    },[lng, i18n])

  const handleDeleteClick = async () => {
    if (confirm(t("areyousuredelete"))) {
      setIsDeleting(true);
      await onDelete(task.id);
      setIsDeleting(false);
    }
  };


  return (
    <div 
      className={`flex items-center justify-between p-4 rounded-xl border bg-white shadow-sm transition-all duration-200 hover:shadow-md ${
        task.completed ? "border-emerald-200 bg-emerald-50/30" : "border-white-200"
      }`}
    >
      <div className="flex items-start gap-3 flex-1 min-w-0">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggleStatus(task.id, task.completed)}
          className="mt-1 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
        />
        
        <div className="flex flex-col min-w-0">
          <span 
            className={`font-medium text-gray-900 break-words ${
              task.completed ? "line-through text-gray-400 font-normal" : ""
            }`}
          >
            {task.title}
          </span>
          {task.description && (
            <p className={`text-sm mt-0.5 break-words ${task.completed ? "text-gray-400/80" : "text-gray-500"}`}>
              {task.description}
            </p>
          )}
          {task.dueDate && (
            <span className="text-xs text-gray-400 mt-1">
              Due: {new Date(task.dueDate).toLocaleDateString()}
            </span>
          )}
        </div>
      </div>

      <div className="flex items center gap-2 ml-4">
        <button 
          className="p-1.5 text-gray-400 hover:text-red-400"
          title={t("edit")}
          >
          <svg xmlns="http://w3.org" height="16" width="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
          </svg>
        </button>
      </div>
      <div className="flex items-center gap-2 ml-4">
        <button
          onClick={handleDeleteClick}
          disabled={isDeleting}
          className="p-1.5 text-gray-400 hover:text-red-600 rounded-md hover:bg-red-50 transition-colors disabled:opacity-50"
          title={t("delete")}
        >
          {isDeleting ? (
            <span className="text-xs font-semibold">...</span>
          ) : (
            <svg xmlns="http://w3.org" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.34 6m-4.74 0L9.26 9m9.96-1-1.01 7.014a3 3 0 0 1-3 2.986H8.79a3 3 0 0 1-3-2.986L4.74 8m15.356 0A3 3 0 0 0 18 5.865h-1.591c-.29 0-.54-.17-.617-.451L15.6 4.571A1.5 1.5 0 0 0 14.118 3H9.882A1.5 1.5 0 0 0 8.43 4.571L8.11 5.414c-.078.282-.328.451-.617.451H6A3 3 0 0 0 3.644 8m15.356 0H3.644" />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
}