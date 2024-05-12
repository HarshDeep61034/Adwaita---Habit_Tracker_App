import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { decode, sign, verify } from "hono/jwt";

const habit = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

habit.post("/new", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const body = await c.req.json();
  const {authorization} = c.req.header();
  const token = authorization.split(" ")[1];
  const data = await decode(token);

const {name, time, category, description} = body;
try{
    console.log(body);
   const response = await prisma.habit.create({
        data: {
            name,
            time,
            category,
            description,
            userId: data.payload.id
        }
    });
  return c.json({ success: true, msg: "Habit Created Successfully"});
}
catch(err){
    console.log(err);
}
  return c.json({ success: true, msg: "Habit Created Successfully"});
});


// write a route to create a habit tracker for defined habit id with todays date and value of completeion as true
habit.post("/track", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const body = await c.req.json();
  const {authorization} = c.req.header();
  const token = authorization.split(" ")[1];
  const data = await decode(token);
  const {habitId} = body;
  try{
    const response = await prisma.habitTracker.create({
      data: {
        habitId,
        date: new Date(),
        Completed: true
      }
    });
    return c.json({ success: true, msg: "Habit Completed Successfully"});
  }
  catch(err){
    console.log(err);
  }
  // return c.json({ success: true, msg: "Habit Tracked Successfully"});
});


export default habit;
