import TodoCard from "./TodoCard"
import { Todo } from "@/types/todo"

interface TodoListProps{
    tasks: Todo[]
}
export default function TodoList({tasks} : TodoListProps){

    if (tasks.length === 0){
        return(
            <div className="text-center py-12 px-4 rounded-xl border border-dashed border-slate-200">
                <p>No tasks found, You are all caught up!</p>
            </div>
        )
    }
    return(
        <div>
            {tasks.map((task) => (
                <TodoCard
                    key={task.id}
                    tasks={task}
                />
            ))}
        </div>
    )
}