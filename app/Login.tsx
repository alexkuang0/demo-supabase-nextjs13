'use client'

import { createClient } from '@supabase/supabase-js'
import { useRouter } from 'next/navigation'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

const Login = () => {
  const router = useRouter()

  async function handleSignUp() {
    await supabase.auth.signUp({
      email: process.env.NEXT_PUBLIC_TEST_USER_EMAIL!,
      password: '12345678',
    })
  }

  async function handleSignIn() {
    await supabase.auth.signInWithPassword({
      email: process.env.NEXT_PUBLIC_TEST_USER_EMAIL!,
      password: '12345678',
    })
    router.refresh()
  }

  async function handleSignOut() {
    await supabase.auth.signOut()
    router.refresh()
  }

  return (
    <div className="flex gap-2">
      <button onClick={handleSignUp}>Sign up</button>
      <button onClick={handleSignIn}>Sign in</button>
      <button onClick={handleSignOut}>Sign out</button>
    </div>
  )
}

export default Login
