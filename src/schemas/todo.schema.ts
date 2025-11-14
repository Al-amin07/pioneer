import z from "zod";
const prioritySchema = z.enum(["extreme", "moderate", "low"]);

export const todoCreateSchema = z.object({
  title: z.string().min(1, "Title is required"),
  date: z.string().min(1, "Date is required"),
  priority: prioritySchema,
  description: z.string().min(1, "Description is required"),
});

export const todoUpdateSchema = z.object({
  title: z.string().min(1, "Title is required"),
  date: z.string().min(1, "Date is required"),
  priority: prioritySchema,
  description: z.string().min(1, "Description is required"),
  is_completed: z.boolean(),
});
