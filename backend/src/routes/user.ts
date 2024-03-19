import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { decode, sign, verify } from "hono/jwt";

const user = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

user.post("/signup", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  const userExists =
    (await prisma.user.findMany({ where: { email: body.email } })).length > 0;
  if (userExists) {
    c.status(403);
    return c.json({ success: false, msg: "User Already Exists!" });
  }
  const username = body.firstName + body.lastName + "5654";
  const response = await prisma.user.create({
    data: {
      firstName: body.firstName,
      lastName: body.lastName,
      email: body.email,
      password: body.password,
      username,
    },
  });
  console.log(response);
  const token = await sign(
    { id: response.id, username: response.username, email: response.email },
    c.env.JWT_SECRET
  );
  return c.json({ success: true, msg: "User Created Successfully", token });
});

user.post("/signin", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  const user = await prisma.user.findUnique({ where: { email: body.email } });
  
  if (!user) {
    c.status(404);
    return c.json({ success: false, msg: "User doesn't exists!!" });
  }

  const passwordMatched = body.password == user.password;

  if (!passwordMatched) {
   c.status(401);
   return c.json({success: false, msg: "Invalid Password"});
  }

  const token = await sign(
    { id: user.id, username: user.username, email: user.email },
    c.env.JWT_SECRET
  );
  return c.json({ success: true, msg: "Loged In Successfully", token });
});

user.get("/user", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const {authorization} = c.req.header();
  console.log(authorization);
  const token = authorization.split(" ")[0];
  const data =  decode(token);
  // prisma.user.findUnique({where: {id}})
  return c.json({msg: "Hello"});
})
export default user;
