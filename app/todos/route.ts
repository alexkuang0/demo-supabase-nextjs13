import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function PUT(req: Request) {
  const { id, is_completed } = await req.json()

  const supabase = createRouteHandlerClient({ cookies })
  const { data } = await supabase
    .from('todos')
    .update({ is_completed })
    .match({ id })

  return NextResponse.json(data)
}
