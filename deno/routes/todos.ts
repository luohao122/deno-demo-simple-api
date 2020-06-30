import { Router } from "https://deno.land/x/oak/mod.ts";
import { Todo } from "../models/todos.ts";

const router = new Router();

let todos: Todo[] = [];

router.get("/todos", (ctx, next) => {
  ctx.response.status = 200;
  ctx.response.body = { todos: todos };
});
router.post("/todos", async (ctx, next) => {
  const data = await ctx.request.body();
  const newTodo: Todo = {
    id: new Date().toISOString(),
    text: data.value.text,
  };
  todos.push(newTodo);
  ctx.response.status = 201;
  ctx.response.body = { message: "Created", todos: todos };
});
router.put("/todos/:todoId", async (ctx, next) => {
  const todoId = ctx.params.todoId;
  const data = await ctx.request.body();
  const todoIndex = todos.findIndex((todo) => todo.id === todoId);
  todos[todoIndex] = {
    id: todos[todoIndex].id,
    text: data.value.text,
  };
  ctx.response.status = 200;
  ctx.response.body = { message: "Updated", todos: todos };
});
router.delete("/todos/:todoId", (ctx, next) => {
  const todoId = ctx.params.todoId;
  todos = todos.filter((todo) => todo.id !== todoId);
  ctx.response.status = 200;
  ctx.response.body = { message: "Deleted" };
});

export default router;
