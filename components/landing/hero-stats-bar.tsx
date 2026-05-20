'use client'

import {
  BadgeCheck,
  Building2,
  CircleDollarSign,
  Package,
  TrendingUp,
} from 'lucide-react'
import { useI18n } from '@/lib/i18n/provider'

export function HeroStatsBar() {
  const { t } = useI18n()

  const stats = [
    { key: 'orders', icon: Package },
    { key: 'smes', icon: Building2 },
    { key: 'suppliers', icon: BadgeCheck },
    { key: 'capital', icon: CircleDollarSign },
    { key: 'fulfillment', icon: TrendingUp },
  ] as const

  return (
    <div className="hero-stats-bar border-y border-border/60 bg-white/70 backdrop-blur-md dark:border-white/[0.08] dark:bg-[hsl(0_0%_4%/0.92)]">
      <div className="container mx-auto px-4 py-4 md:py-5">
        <div className="mx-auto grid max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-5 lg:gap-4">
          {stats.map(({ key, icon: Icon }) => (
            <div key={key} className="flex items-start gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-pale text-brand-mid dark:bg-brand-mid/20 dark:text-brand-light">
                <Icon className="h-4 w-4" aria-hidden />
              </div>
              <div className="min-w-0">
                <p className="text-[11px] font-medium text-muted-foreground dark:text-white/50">
                  {t(`landing.hero.stats.${key}.label`)}
                </p>
                <p className="font-display text-2xl font-normal tracking-tight text-foreground md:text-[1.65rem] dark:text-white">
                  {t(`landing.hero.stats.${key}.value`)}
                </p>
                <p className="text-[11px] font-medium text-brand-mid dark:text-brand-light">
                  {t(`landing.hero.stats.${key}.delta`)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
