import DeleteTodoModal from "@/components/modal/DeleteTodoModal";
import UpdateTodoModal from "@/components/modal/UpdateTodoModal";
import { ITodo } from "@/types/todo.type";
export function getPriorityColor(
  priority: "extreme" | "moderate" | "low"
): string {
  switch (priority) {
    case "extreme":
      return "bg-red-100 text-red-500";
    case "moderate":
      return "bg-green-100 text-green-500";
    case "low":
      return "bg-yellow-100 text-yellow-400";
    default:
      return "bg-gray-100 text-gray-400"; // fallback color
  }
}

export default function TodoCard({ task }: { task: ITodo }) {
  return (
    <div
      key={task.id}
      className="bg-white hover:shadow-xl transition-all duration-300  p-6 rounded-xl shadow-sm"
    >
      {/* Header */}
      <div className="flex justify-between mb-3 mr-8">
        <h3 className="font-semibold text-lg">{task?.title}</h3>

        {/* Priority Badge */}
        <span
          className={`${getPriorityColor(
            task?.priority
          )}  px-2 py-1 capitalize text-sm rounded-md`}
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
  );
}
