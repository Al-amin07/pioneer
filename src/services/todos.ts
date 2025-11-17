"use server";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

const url = "https://todo-app.pioneeralpha.com/api";
export const getAllTodos = async (search: string) => {
  try {
    console.log({ search });
    const accessToken = (await cookies()).get("access")?.value as string;
    const res = await fetch(`${url}/todos/?search=${search}`, {
      method: "GET",

      next: {
        revalidate: 6000,
        tags: ["TODOS"],
      },
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const data = await res.json();
    return data;
  } catch (error: any) {
    console.log({ error });
    return new Error(error);
  }
};

export const createTodo = async (todoData: FormData) => {
  try {
    const accessToken = (await cookies()).get("access")?.value as string;
    const res = await fetch(`${url}/todos/`, {
      method: "POST",

      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: todoData,
    });
    const data = await res.json();
    revalidateTag("TODOS", { expire: 0 });

    return data;
  } catch (error: any) {
    console.log({ error });
    return new Error(error);
  }
};
export const updateTodo = async (todoId: number, todoData: FormData) => {
  try {
    const accessToken = (await cookies()).get("access")?.value as string;
    const res = await fetch(`${url}/todos/${todoId}/`, {
      method: "PATCH",

      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: todoData,
    });
    if (!res.ok) {
      const text = await res.text(); // get the HTML or error message
      console.error("Server error:", text);
      throw new Error(`Server returned ${res.status}`);
    }
    console.log({ res });
    const data = await res.json();
    revalidateTag("TODOS", { expire: 0 });

    return data;
  } catch (error: any) {
    console.log({ error });
    return new Error(error);
  }
};

export const deleteTodo = async (todoId: number) => {
  try {
    console.log({ todoId });
    const accessToken = (await cookies()).get("access")?.value as string;
    const res = await fetch(`${url}/todos/${todoId}/`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    console.log({ res });
    if (res.status === 204) {
      revalidateTag("TODOS", { expire: 0 });
      const data = await res.json();
      return data;
    }
  } catch (error: any) {
    console.log({ error });
    return new Error(error);
  }
};
