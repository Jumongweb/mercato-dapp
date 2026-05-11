'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { SelectRoleModal } from '@/components/select-role-modal'
import { usePathname } from 'next/navigation'

type UserType = 'pyme' | 'investor' | 'supplier'

/** Paths where we never want to show the role-selection modal. */
const AUTH_PREFIXES = ['/auth', '/api']

export function UserTypeGate() {
  const pathname = usePathname()
  const [userId, setUserId] = useState<string | null>(null)
  const [needsRole, setNeedsRole] = useState(false)

  const isAuthRoute = AUTH_PREFIXES.some((prefix) => pathname.startsWith(prefix))

  useEffect(() => {
    if (isAuthRoute) return

    const supabase = createClient()

    const checkProfile = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) return

      const { data: profile } = await supabase
        .from('profiles')
        .select('user_type')
        .eq('id', user.id)
        .single()

      if (!profile?.user_type) {
        setUserId(user.id)
        setNeedsRole(true)
      }
    }

    checkProfile()
  }, [isAuthRoute, pathname])

  if (!needsRole || !userId) return null

  const handleComplete = (userType: UserType) => {
    // Reload the page so the dashboard re-fetches with the new user_type.
    // We pass the chosen type in the URL so the server page can act on it immediately
    // without waiting for a cache refresh.
    setNeedsRole(false)
    window.location.reload()
  }

  return <SelectRoleModal userId={userId} onComplete={handleComplete} />
}
