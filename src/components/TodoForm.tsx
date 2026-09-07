import '@/i18n'
import { Todo, TodoFormData } from "@/types/todo"
import { useEffect } from 'react'
import { useForm } from "react-hook-form"
import { useTranslation } from 'react-i18next'

interface TodoFormProps {
    initialValues?: TodoFormData
    onSubmit: (data: TodoFormData) => Promise<void>
    loading?: boolean
    lng: string
}
export default function TodoForm({
    initialValues,
    onSubmit,
    loading,
    lng
}: TodoFormProps){

    const {t, i18n} = useTranslation()

    useEffect(() => {
    if(lng && i18n.language !== lng){
        i18n.changeLanguage(lng)
    }
    },[lng, i18n])

    const { register, handleSubmit, formState: {errors}} = useForm<TodoFormData>({
        defaultValues: initialValues,
    })
    return(
         <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4 text-black"
        >
            <div>
                <label className="block mb-1">
                {t("title")}
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
                {t("description")}
                </label>

                <textarea
                {...register('description')}
                rows={4}
                className="w-full border rounded p-2"
                />
            </div>

            <div>
                <label className="block mb-1">
                {t("duedate")}
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
                    {t("completed")}
                </label>
                </div>
            )}

            <button
                type="submit"
                disabled={loading}
                className="rounded bg-black px-4 py-2 text-white"
            >
                {loading
                ? t("saving")
                : initialValues
                ? t("savechanges")
                : t("createtodo")}
            </button>
        </form>
    )
}