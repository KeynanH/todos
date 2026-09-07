"use client";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import allLocales from "@fullcalendar/core/locales-all.js";
import { Todo } from "@/types/todo";

interface TodoCalendarProps {
  tasks: Todo[];
  lng: string
}

export default function TodoCalendar({ tasks, lng }: TodoCalendarProps) {
  const calendarEvents = tasks
    .filter((todo) => todo.dueDate)
    .map((todo) => {
      const dateString = todo.dueDate ? todo.dueDate.split("T")[0] : "";

      return {
        id: todo.id,
        title: todo.title,
        start: dateString,
        allDay: true,
        extendedProps: {
          description: todo.description || "",
          completed: todo.completed,
        },
        backgroundColor: todo.completed ? "#10B981" : "#4F46E5",
        borderColor: todo.completed ? "#059669" : "#4338CA",
      };
    });

  return (
    <div className="w-full bg-white p-4 rounded-xl border border-gray-200 shadow-sm font-sans text-gray-800">
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        events={calendarEvents}
        height="auto"
        locales={allLocales}
        locale={lng}
        eventClick={(info) => {
          alert(`Task: ${info.event.title}\nDescription: ${info.event.extendedProps.description}`);
        }}
      />
    </div>
  );
}