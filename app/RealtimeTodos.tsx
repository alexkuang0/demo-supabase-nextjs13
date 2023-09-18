'use client'

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import TodoItem from './TodoItem'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function RealtimeTodos({ todos }: { todos: Todo[] }) {
  const supabase = createClientComponentClient<Database>()
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
