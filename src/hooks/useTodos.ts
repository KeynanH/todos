'use client';

import { Todo } from "@/types/todo";
import { useEffect, useState } from "react";

export function useTodos() {
    const [tasks, setTasks] = useState<Todo[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchTodos = async () => {
        setIsLoading(true);
        try {
            const res = await fetch('/api/todos');
            if (res.ok) {
                const data = await res.json();
                setTasks(data);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    const editTodo = async (id: string, updatedData: Partial<Todo>) => {
        setTasks(prev => prev.map(task => task.id === id ? {...task, ...updatedData}: task))

        try {
            const res = await fetch('/api/todos',{
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({ id, updatedData})
            })
            if(!res.ok) throw new Error()
        } catch (error) {
            console.error(error)
            await fetchTodos()
        }
    }

    const toggleTodoStatus = async (id: string, currentStatus: boolean) => {
        try {
            const res = await fetch('/api/todos', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id, completed: !currentStatus })
            });
            if (res.ok) await fetchTodos(); // Refresh state immediately
        } catch (error) {
            console.error("Hook update error:", error);
        }
    };

    const removeTodo = async (id: string) => {
        try {
            const res = await fetch(`/api/todos?id=${id}`, {
                method: 'DELETE',
            });
            if (res.ok) await fetchTodos(); // Refresh state immediately
        } catch (error) {
            console.error("Hook delete error:", error);
        }
    };

    useEffect(() => {
        fetchTodos();
    }, []);

    return { 
        tasks, 
        isLoading,
        editTodo, 
        refreshTodos: fetchTodos, 
        toggleTodoStatus, 
        removeTodo 
    };
}