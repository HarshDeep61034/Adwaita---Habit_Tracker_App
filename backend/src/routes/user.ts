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
  console.log(body);
  const userExists =
    (await prisma.user.findMany({ where: { email: body.email } })).length > 0;
  if (userExists) {
    c.status(403);
    return c.json({ success: false, msg: "User Already Exists!" });
  }

  const response = await prisma.user.create({
    data: {
      firstName: body.firstName,
      lastName: body.lastName,
      email: body.email,
      password: body.password,    
    },
  });
  console.log(response);
  const token = await sign(
    { id: response.id, email: response.email, firstName: body.firstName, lastName: body.lastName },
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
    { id: user.id, email: user.email, firstName: user.firstName, lastName: user.lastName, bio: user.bio},
    c.env.JWT_SECRET
  );
  return c.json({ success: true, msg: "Loged In Successfully", token });
});



user.get("/stats", async (c) => {
  const { authorization } = c.req.header();
  const token = authorization.split(" ")[1];
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  try {
    console.log(c.env.JWT_SECRET);
    const data = await verify(token, c.env.JWT_SECRET);
    console.log(data);
    const habits = await prisma.habit.findMany({
      where: {
        userId: data.id,
      },  
    });
    
    return c.json({ success: true, msg: "Habits", habits });
  }
       catch (err) {
        return c.json({ success: false, err: "error: " + err });
      }
    });


user.get("/auth", async (c) => {
  const { authorization } = c.req.header();
  const token = authorization.split(" ")[1];
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  try {
    console.log(c.env.JWT_SECRET);
    const data = await verify(token, c.env.JWT_SECRET);
    console.log(data);
    const habits = await prisma.habit.findMany({
      where: {
        userId: data.id,
        Status: {
          none: {
            date: {
              gte: new Date(new Date().setHours(0, 0, 0, 0)),
              lt: new Date(new Date().setHours(23, 59, 59, 999)),
            },
          },
        },
      },
    });
    return c.json({ success: true, msg: "User Authorized!!", data, habits });
  } catch (err) {
    return c.json({ success: false, err: "error: " + err });
  }
});

user.get("/info", async (c) => {
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

user.post("/update", async (c) => { 
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    const {authorization} = c.req.header();
    const token = authorization.split(" ")[1];
    const data = await verify(token, c.env.JWT_SECRET);
    const body = await c.req.json();
    console.log(body);
    console.log(data);
    const user = await prisma.user.update({where: {email: data.email}, data: body});
    

  const updatedtoken = await sign(
    { id: user.id, email: user.email, firstName: user.firstName, lastName: user.lastName, bio: body.bio},
    c.env.JWT_SECRET
  );
  
  return c.json({ success: true, msg: "User Updated Successfully", token: updatedtoken });
   
  }
)

user.post("newpost", async (c)=>{
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const {authorization} = c.req.header();
  const token = authorization.split(" ")[1];
  const data = await verify(token, c.env.JWT_SECRET);
  const body = await c.req.json();
  const response = await prisma.post.create({
    data: {
      content: body.content,
      username: data.firstName + " " + data.lastName,
      userId: data.id
    }
  })
  return c.json({success: true, msg: "Post Created Successfully", response});
})


user.get("posts", async (c)=>{
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const response = await prisma.post.findMany();
  return c.json({posts: response});
})

user.get("userposts", async (c)=>{
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const {authorization} = c.req.header();
  const token = authorization.split(" ")[1];
  const data = await verify(token, c.env.JWT_SECRET);
  const response = await prisma.post.findMany({where: {userId: data.id}});
  return c.json({posts: response});
})


export default user;
