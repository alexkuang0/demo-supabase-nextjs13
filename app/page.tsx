import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import Login from './Login'

export default async function Home() {
  const supabase = createServerComponentClient({ cookies })
  const { data } = await supabase.from('todos').select()

  return (
    <>
      <Login />
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </>
  )
}
