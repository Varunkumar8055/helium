import { serve } from "@hono/node-server";
import { Hono } from "hono";

const app = new Hono();
const reminders: string[] = [];

app.get("/health", (context) => {
  const req = context.req;
  return context.json({"message": "Hello, World!"}, 200);
});

app.get("/reminders", (context) => {
  return context.json(reminders, 200);
})

app.post("/reminders", async (context) => {
  //const body = (await context.req.parseBody()) as Record<string, string>;
  const body = await context.req.json();
  console.log(body);
  const reminder = body.reminder;
  reminders.push(body.reminder);
  return context.json(reminders, 201);
});

serve(app);

console.log("server is runnning on port 3000");