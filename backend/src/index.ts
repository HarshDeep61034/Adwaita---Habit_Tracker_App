import { Hono } from 'hono'
import user from './routes/user'
import { cors } from 'hono/cors'
const app = new Hono()
app.use(cors());
app.get('/', (c) => {
  return c.text('Hello Hono!')
})

// app.route('/api/v1/blog/',blog);

app.route('/api/v1', user);

export default app
