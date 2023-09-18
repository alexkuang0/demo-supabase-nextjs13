import { createClient } from '@supabase/supabase-js'
import Login from './Login'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default async function Home() {
  const { data } = await supabase.from('todos').select()
  return (
    <>
      <Login />
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </>
  )
}
