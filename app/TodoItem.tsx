'use client'

import { useRouter } from 'next/navigation'
import { clsx } from 'clsx'

export type Todo = {
  id: string
  created_at: string
  is_completed: boolean
  owner: string
  content: string
}

type TodoProps = {
  item: Todo
}

export default function TodoItem({ item }: TodoProps) {
  const router = useRouter()

  async function markAsComplete() {
    await fetch(`${location.origin}/todos`, {
      method: 'PUT',
      body: JSON.stringify({ id: item.id, is_completed: !item.is_completed }),
    })
    router.refresh()
  }
  return (
    <button
      onClick={markAsComplete}
      className={clsx('block', {
        'line-through text-gray-300': item.is_completed,
      })}
    >
      {item.content}
    </button>
  )
}
