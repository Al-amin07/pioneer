"use client";
import { deleteTodo } from "@/services/todos";
import { ITodo } from "@/types/todo.type";
import { useState } from "react";
import { FiTrash2 } from "react-icons/fi";
import { toast } from "sonner";

export default function DeleteTodoModal({ task }: { task: ITodo }) {
  const [openModal, setOpenModal] = useState(false);
  const onDelete = async (id: number) => {
    console.log({ iddd: id });
    const toastId = toast.loading("Deleting todo....");
    try {
      const result = await deleteTodo(id);
      console.log({ result });
      toast.success("Todo deleted successfull", { id: toastId });
    } catch (error: any) {
      toast.error(error?.message || "Something went wrong", { id: toastId });
      console.log({ error });
    } finally {
      setOpenModal(false);
    }
  };
  return (
    <>
      {/* Delete Button */}

      <button
        onClick={() => setOpenModal(true)}
        className="hover:text-red-600 cursor-pointer"
      >
        <FiTrash2 size={18} />
      </button>

      {/* Overlay */}
      <div
        onClick={() => setOpenModal(false)}
        className={`fixed z-50 w-screen ${
          openModal ? "visible opacity-100" : "invisible opacity-0"
        } inset-0 grid place-items-center bg-black/20 backdrop-blur-xs duration-100 dark:bg-transparent`}
      >
        {/* Modal */}
        <div
          onClick={(e_) => e_.stopPropagation()}
          className={`absolute max-w-md rounded-lg bg-white p-6 drop-shadow-lg  ${
            openModal
              ? "opacity-100 duration-300"
              : "scale-110 opacity-0 duration-150"
          }`}
        >
          {/* Close Icon */}
          <svg
            onClick={() => setOpenModal(false)}
            className="absolute right-3 top-3 w-6 cursor-pointer fill-zinc-600 dark:fill-white"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M6.99486 7.00636C6.60433 7.39689 6.60433 8.03005 6.99486 8.42058L10.58 12.0057L6.99486 15.5909C6.60433 15.9814 6.60433 16.6146 6.99486 17.0051C7.38538 17.3956 8.01855 17.3956 8.40907 17.0051L11.9942 13.4199L15.5794 17.0051C15.9699 17.3956 16.6031 17.3956 16.9936 17.0051C17.3841 16.6146 17.3841 15.9814 16.9936 15.5909L13.4084 12.0057L16.9936 8.42059C17.3841 8.03007 17.3841 7.3969 16.9936 7.00638C16.603 6.61585 15.9699 6.61585 15.5794 7.00638L11.9942 10.5915L8.40907 7.00636C8.01855 6.61584 7.38538 6.61584 6.99486 7.00636Z"></path>
          </svg>

          {/* Header */}
          <h1 className="mb-2 text-2xl font-semibold text-red-600">
            Delete Todo?
          </h1>

          <p className="mb-5 text-sm opacity-80">
            Are you sure you want to delete this task? This action cannot be
            undone.
          </p>

          {/* Buttons */}
          <div className="flex justify-end gap-2">
            <button
              onClick={() => setOpenModal(false)}
              className="rounded-md border cursor-pointer border-zinc-400 px-6 py-1.5 text-zinc-600 hover:bg-zinc-200"
            >
              Cancel
            </button>

            <button
              onClick={() => {
                onDelete(task?.id); // call delete
                setOpenModal(false);
              }}
              className="rounded-md cursor-pointer bg-rose-600 px-6 py-1.5 text-white hover:bg-rose-700"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
