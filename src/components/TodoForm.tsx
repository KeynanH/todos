import { Todo, TodoFormData } from "@/types/todo"
import { useForm } from "react-hook-form"

interface TodoFormProps {
    initialValues?: TodoFormData
    onSubmit: (data: TodoFormData) => Promise<void>
    loading?: boolean
}
export default function TodoForm({
    initialValues,
    onSubmit,
    loading
}: TodoFormProps){


    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm<TodoFormData>({
        defaultValues: initialValues,
    })
    return(
         <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4 text-black"
        >
            <div>
                <label className="block mb-1">
                Title
                </label>

                <input
                {...register('title', {
                    required: 'Title is required',
                })}
                className="w-full border rounded p-2"
                />

                {errors.title && (
                <p className="text-red-500 text-sm">
                    {errors.title.message}
                </p>
                )}
            </div>

            <div>
                <label className="block mb-1">
                Description
                </label>

                <textarea
                {...register('description')}
                rows={4}
                className="w-full border rounded p-2"
                />
            </div>

            <div>
                <label className="block mb-1">
                Due Date
                </label>

                <input
                type="datetime-local"
                {...register('dueDate')}
                className="w-full border rounded p-2"
                />
            </div>

            {initialValues && (
                <div>
                <label className="flex items-center gap-2">
                    <input
                    type="checkbox"
                    {...register('completed')}
                    />
                    Completed
                </label>
                </div>
            )}

            <button
                type="submit"
                disabled={loading}
                className="rounded bg-black px-4 py-2 text-white"
            >
                {loading
                ? 'Saving...'
                : initialValues
                ? 'Save Changes'
                : 'Create Todo'}
            </button>
        </form>
    )
}