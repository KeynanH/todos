'use client';

import { Todo } from "@/types/todo";
import { useEffect, useState } from "react";

export function useTodos() {
    const [tasks, setTasks] = useState<Todo[]>([])
    const [isLoading, setIsLoading] = useState(true)

    const fetchTodos = async () => {
        setIsLoading(true)
        try {
            const res = await fetch('/api/todos')
            const data = await res.json()
            setTasks(data)
        } catch (error) {
            console.error(error)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() =>{
        fetchTodos()
    }, [])

    return {tasks, isLoading}
}
