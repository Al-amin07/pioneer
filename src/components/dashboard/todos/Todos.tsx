"use client";

import CreasteTodoModal from "@/components/modal/CreateTodoModal";
import DeleteTodoModal from "@/components/modal/DeleteTodoModal";
import UpdateTodoModal from "@/components/modal/UpdateTodoModal";
import { deleteTodo } from "@/services/todos";
import { ITodo } from "@/types/todo.type";
import { FiSearch, FiPlus, FiEdit2, FiTrash2, FiFilter } from "react-icons/fi";
import { toast } from "sonner";

export function getPriorityColor(
  priority: "extreme" | "moderate" | "low"
): string {
  switch (priority) {
    case "extreme":
      return "bg-red-500";
    case "moderate":
      return "bg-green-500";
    case "low":
      return "bg-yellow-400";
    default:
      return "bg-gray-400"; // fallback color
  }
}

export default function Todos({ todos }: { todos: ITodo[] }) {
  return (
    <div>
      {/* Title */}
      <h1 className="text-3xl font-semibold mb-6">Todos</h1>

      {/* Search + Sort + New Task */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
        {/* Search */}
        <div className="flex items-center w-full md:w-1/2 bg-white shadow-sm p-2 rounded-md">
          <FiSearch className="text-gray-500 ml-2" />
          <input
            type="text"
            placeholder="Search your task here..."
            className="w-full px-3 py-1 focus:outline-none"
          />
        </div>

        {/* Sort + New Task */}
        <div className="flex items-center gap-4">
          {/* Sort Button */}
          <button className="bg-white shadow-sm px-4 py-2 rounded-md flex items-center gap-2">
            Sort by <FiFilter />
          </button>

          {/* New Task */}
          <CreasteTodoModal />
        </div>
      </div>

      {/* Your Tasks */}
      <h2 className="text-xl font-semibold mb-4">Your Tasks</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {todos?.map((task) => (
          <div key={task.id} className="bg-white p-5 rounded-xl shadow-sm">
            {/* Header */}
            <div className="flex justify-between mb-3">
              <h3 className="font-semibold text-lg">{task?.title}</h3>

              {/* Priority Badge */}
              <span
                className={`${getPriorityColor(
                  task?.priority
                )} text-white px-2 py-1 text-xs rounded-md`}
              >
                {task.priority}
              </span>
            </div>

            {/* Description */}
            <p className="text-gray-600 text-sm mb-3">{task?.description}</p>

            <div className="flex items-center justify-between">
              {/* Due Date */}
              <p className="text-gray-700 text-sm font-medium">
                Due {task?.todo_date}
              </p>

              {/* Icons */}
              <div className="flex gap-4 mt-4 text-gray-600">
                <UpdateTodoModal todo={task} />
                <DeleteTodoModal task={task} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
