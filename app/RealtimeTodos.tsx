'use client'

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import TodoItem, { Todo } from './TodoItem'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

type RealtimeTodosProps = {
  todos: Todo[] | null
}

export default function RealtimeTodos({ todos }: RealtimeTodosProps) {
  const supabase = createClientComponentClient()
  const router = useRouter()

  useEffect(() => {
    const channel = supabase
      .channel('realtime todos')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'todos' },
        () => {
          router.refresh()
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [supabase, router])

  return todos?.map((todo) => <TodoItem key={todo.id} item={todo} />)
}
