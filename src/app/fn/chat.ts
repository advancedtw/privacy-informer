"use server";

import { requestInfo } from "@redwoodjs/sdk/worker";

export async function addTodo(formData: FormData) {
  const { ctx } = requestInfo;
  const title = formData.get("title");
  await db.todo.create({ data: { title, userId: ctx.user.id } });
}