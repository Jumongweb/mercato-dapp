'use client'

import { useState } from 'react'
import { Building2 } from 'lucide-react'

export function SupplierLogo({
  logoUrl,
  companyName
}: {
  logoUrl: string | null
  companyName: string
}) {
  const [imageError, setImageError] = useState(false)
  return (
    <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-2xl border border-border/50 bg-primary/5">
      {logoUrl && !imageError ? (
        <img
          src={logoUrl}
          alt={companyName}
          className="h-full w-full object-cover"
          onError={() => setImageError(true)}
        />
      ) : (
        <Building2 className="h-8 w-8 text-primary" aria-hidden />
      )}
    </div>
  )
}
