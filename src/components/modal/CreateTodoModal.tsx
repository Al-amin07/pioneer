"use client";
import { useState } from "react";
import { FiPlus } from "react-icons/fi";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { createTodo } from "@/services/todos";
import { toast } from "sonner";
import { todoCreateSchema } from "@/schemas/todo.schema";

type TodoForm = z.infer<typeof todoCreateSchema>;

export default function CreasteTodoModal() {
  const [openModal, setOpenModal] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<TodoForm>({
    resolver: zodResolver(todoCreateSchema),
  });

  const onSubmit = async (data: TodoForm) => {
    console.log("Form Data:", data);

    const formdata = new FormData();
    formdata.append("title", data?.title);
    formdata.append("description", data?.description);
    formdata.append("todo_date", data?.date);
    formdata.append("priority", data?.priority);
    try {
      const result = await createTodo(formdata);
      console.log({ result });

      if (result?.id) {
        toast.success("Todo created successfully");
        setOpenModal(false);
        reset();
      } else {
        throw new Error(result?.detail);
      }
    } catch (error: any) {
      toast.error(error?.message);
      console.log({ error });
    }
  };

  return (
    <>
      <button
        onClick={() => setOpenModal(true)}
        className="bg-[#5272FF] cursor-pointer text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-blue-700"
      >
        <FiPlus /> New Task
      </button>

      <div
        onClick={() => setOpenModal(false)}
        className={`fixed z-50 w-screen ${
          openModal ? "visible opacity-100" : "invisible opacity-0"
        } inset-0 grid place-items-center bg-black/20 backdrop-blur-xs duration-100 dark:bg-transparent`}
      >
        <div
          onClick={(e_) => e_.stopPropagation()}
          className={`absolute max-w-md w-full rounded-lg bg-white p-6 drop-shadow-lg  ${
            openModal
              ? "opacity-100 duration-300"
              : "scale-110 opacity-0 duration-150"
          }`}
        >
          {/* Close Button */}
          <svg
            onClick={() => setOpenModal(false)}
            className="absolute right-3 top-3 w-6 cursor-pointer fill-zinc-600 dark:fill-white"
            viewBox="0 0 24 24"
          >
            <path d="M6.99486 7.00636C6.60433 7.39689 6.60433 8.03005 6.99486 8.42058L10.58 12.0057L6.99486 15.5909C6.60433 15.9814 6.60433 16.6146 6.99486 17.0051C7.38538 17.3956 8.01855 17.3956 8.40907 17.0051L11.9942 13.4199L15.5794 17.0051C15.9699 17.3956 16.6031 17.3956 16.9936 17.0051C17.3841 16.6146 17.3841 15.9814 16.9936 15.5909L13.4084 12.0057L16.9936 8.42059C17.3841 8.03007 17.3841 7.3969 16.9936 7.00638C16.603 6.61585 15.9699 6.61585 15.5794 7.00638L11.9942 10.5915L8.40907 7.00636C8.01855 6.61584 7.38538 6.61584 6.99486 7.00636Z"></path>
          </svg>

          <h1 className="mb-4 text-xl font-semibold">Create New Task</h1>

          {/* ---------------- FORM ---------------- */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 ">
            {/* Title */}
            <div>
              <label className="block font-medium mb-1">Title</label>
              <input
                type="text"
                {...register("title")}
                className="w-full rounded border px-3 py-2 "
                placeholder="Task title"
              />
              {errors.title && (
                <p className="text-red-500 text-sm">{errors.title.message}</p>
              )}
            </div>

            {/* Date */}
            <div>
              <label className="block font-medium mb-1">Date</label>
              <input
                type="date"
                {...register("date")}
                className="w-full rounded border px-3 py-2 "
              />
              {errors.date && (
                <p className="text-red-500 text-sm">{errors.date.message}</p>
              )}
            </div>

            {/* Priority */}
            <div>
              <p className="font-medium mb-1">Priority</p>

              <div className="flex flex-col gap-1">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    value="extreme"
                    {...register("priority")}
                  />
                  Extreme
                </label>

                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    value="moderate"
                    {...register("priority")}
                  />
                  Moderate
                </label>

                <label className="flex items-center gap-2">
                  <input type="radio" value="low" {...register("priority")} />
                  Low
                </label>
              </div>

              {errors.priority && (
                <p className="text-red-500 text-sm">
                  {errors.priority.message}
                </p>
              )}
            </div>

            {/* Description */}
            <div>
              <label className="block font-medium mb-1">Description</label>
              <textarea
                {...register("description")}
                rows={4}
                className="w-full rounded border px-3 py-2 "
                placeholder="Task description..."
              />
              {errors.description && (
                <p className="text-red-500 text-sm">
                  {errors.description.message}
                </p>
              )}
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-2 mt-3">
              <button
                type="button"
                onClick={() => setOpenModal(false)}
                className="rounded-md border border-rose-600 px-6 py-1.5 text-rose-600 duration-150 hover:bg-rose-600 hover:text-white"
              >
                Cancel
              </button>

              <button
                disabled={isSubmitting}
                type="submit"
                className="rounded-md disabled:cursor-not-allowed disabled:opacity-70 bg-emerald-600 px-6 py-1.5 text-white hover:bg-emerald-700"
              >
                {isSubmitting ? "Creating...." : "Create"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
