import { createServerActionClient } from '@supabase/auth-helpers-nextjs'
import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'

export default async function NewTodo() {
  return (
    <form action={addTodo}>
      <input
        className="border"
        placeholder="Create a new todo ..."
        name="content"
      />
    </form>
  )
}

async function addTodo(formData: FormData) {
  'use server'

  const supabase = createServerActionClient<Database>({ cookies })

  const { data } = await supabase.auth.getUser()
  if (!data.user) throw new Error('Unauthenticated')

  const content = formData.get('content') as string
  await supabase.from('todos').insert({ content, owner: data.user.id })

  revalidatePath('/')
}
