import { Todo } from "@/types/todo"

interface TodoCardProps {
    tasks: Todo
}

export default function TodoCard({tasks}: TodoCardProps){

    return(
        <div className="flex items-center justify-betweem p-4 rounded-xl border bg-white transition-all duration-200">
            {tasks.title}
            {tasks.description}
            {tasks.completed}
        </div>
    )
} 