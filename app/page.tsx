import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import NewTodo from './NewTodo'
import TodoItem, { type Todo } from './TodoItem'

export default async function Home() {
  const supabase = createServerComponentClient({ cookies })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) redirect('/unauthenticated')

  const { data: todos }: { data: Todo[] | null } = await supabase
    .from('todos')
    .select()
    .order('created_at')

  return (
    <>
      <h1 className="font-bold text-2xl">Hello, {session.user.email}</h1>
      <NewTodo />
      {todos?.map((todo) => (
        <TodoItem key={todo.id} item={todo} />
      ))}
    </>
  )
}
