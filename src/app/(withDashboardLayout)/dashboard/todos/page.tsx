import Todos from "@/components/dashboard/todos/Todos";
import { getAllTodos } from "@/services/todos";

export default async function TodoPage() {
  const data = await getAllTodos();
  const todos = data?.results;
  console.log({ todos });
  return (
    <div>
      <Todos todos={todos} />
    </div>
  );
}
