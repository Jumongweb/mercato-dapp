'use client'

import * as React from 'react'
import { Building2, Package, Star, TrendingUp, Users } from 'lucide-react'
import { MercatoLogo } from '@/components/mercato-logo'
import { useI18n } from '@/lib/i18n/provider'
import { cn } from '@/lib/utils'

function DealCard({
  className,
  label,
  children,
  icon: Icon,
}: {
  className?: string
  label: string
  children: React.ReactNode
  icon: React.ElementType
}) {
  return (
    <div
      className={cn(
        'hero-deal-card absolute z-20 w-[min(11.5rem,42vw)] rounded-xl border p-3 backdrop-blur-md',
        'border-brand-mid/15 bg-white/90 shadow-[0_12px_40px_-12px_hsl(var(--brand-dark)/0.12)]',
        'dark:border-white/10 dark:bg-[hsl(0_0%_6%/0.82)] dark:shadow-[0_12px_40px_-12px_hsl(0_0%_0%/0.7)]',
        className,
      )}
    >
      <div className="mb-2 flex items-center gap-1.5">
        <Icon className="h-3 w-3 shrink-0 text-brand-mid dark:text-brand-light" aria-hidden />
        <span className="text-[9px] font-bold uppercase tracking-[0.14em] text-brand-mid dark:text-brand-light/90">
          {label}
        </span>
      </div>
      {children}
    </div>
  )
}

function AvatarStack() {
  const colors = ['bg-brand-mid', 'bg-brand-light', 'bg-emerald-600', 'bg-emerald-800']
  return (
    <div className="flex -space-x-2">
      {colors.map((bg, i) => (
        <div
          key={bg}
          className={cn(
            'flex h-6 w-6 items-center justify-center rounded-full border-2 border-white text-[9px] font-bold text-white dark:border-[hsl(0_0%_6%)]',
            bg,
          )}
          aria-hidden
        >
          {String.fromCharCode(65 + i)}
        </div>
      ))}
      <div className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-brand-pale text-[8px] font-bold text-brand-mid dark:border-[hsl(0_0%_6%)] dark:bg-white/10 dark:text-brand-light">
        +24
      </div>
    </div>
  )
}

export function HeroLiveDeal() {
  const { t } = useI18n()
  const [pulse, setPulse] = React.useState(0)

  React.useEffect(() => {
    const id = setInterval(() => setPulse((p) => (p + 1) % 4), 2800)
    return () => clearInterval(id)
  }, [])

  return (
    <div
      className="hero-live-deal relative mx-auto aspect-square w-full max-w-[min(100%,28rem)]"
      aria-label={t('landing.hero.liveDeal.order.label')}
    >
      <svg
        className="hero-deal-ring absolute inset-0 h-full w-full"
        viewBox="0 0 400 400"
        aria-hidden
      >
        <circle
          cx="200"
          cy="200"
          r="148"
          fill="none"
          stroke="hsl(var(--brand-light))"
          strokeWidth="1"
          strokeOpacity="0.35"
          strokeDasharray="6 8"
        />
        {[
          'M200 52 L200 118',
          'M248 200 L318 200',
          'M200 248 L200 318',
          'M82 200 L152 200',
        ].map((d, i) => (
          <path
            key={d}
            d={d}
            fill="none"
            stroke="hsl(var(--brand-light))"
            strokeWidth="1.5"
            className={cn(
              'transition-opacity duration-500',
              pulse === i ? 'opacity-90' : 'opacity-25',
            )}
          />
        ))}
      </svg>

      <div className="absolute left-1/2 top-1/2 z-10 w-[46%] -translate-x-1/2 -translate-y-1/2 text-center">
        <div className="rounded-2xl border border-brand-mid/15 bg-white/95 px-4 py-4 shadow-lg backdrop-blur-md dark:border-brand-light/20 dark:bg-[hsl(0_0%_4%/0.9)] dark:shadow-none">
          <MercatoLogo className="mx-auto h-7 w-auto dark:hidden" />
          <MercatoLogo className="mx-auto hidden h-7 w-auto dark:block" onBrand />
        </div>
      </div>

      <DealCard
        className="left-1/2 top-0 -translate-x-1/2 -translate-y-1"
        label={t('landing.hero.liveDeal.order.label')}
        icon={Package}
      >
        <p className="truncate text-xs font-bold text-foreground dark:text-white">
          {t('landing.hero.liveDeal.order.name')}
        </p>
        <p className="mt-0.5 text-[11px] font-semibold text-brand-mid dark:text-brand-light">
          {t('landing.hero.liveDeal.order.amount')}
        </p>
        <span className="mt-1.5 inline-block rounded-full bg-brand-pale px-2 py-0.5 text-[9px] font-medium text-brand-mid dark:bg-brand-mid/30 dark:text-brand-light">
          {t('landing.hero.liveDeal.order.status')}
        </span>
      </DealCard>

      <DealCard
        className="left-0 top-1/2 -translate-x-1 -translate-y-1/2"
        label={t('landing.hero.liveDeal.sme.label')}
        icon={Building2}
      >
        <p className="truncate text-xs font-bold text-foreground dark:text-white">
          {t('landing.hero.liveDeal.sme.name')}
        </p>
        <div className="mt-1 flex items-center gap-1 text-[10px] text-muted-foreground dark:text-white/55">
          <Star className="h-3 w-3 fill-amber-400 text-amber-400" aria-hidden />
          <span>{t('landing.hero.liveDeal.sme.rating')}</span>
        </div>
        <p className="mt-0.5 text-[10px] text-muted-foreground dark:text-white/45">
          {t('landing.hero.liveDeal.sme.location')}
        </p>
      </DealCard>

      <DealCard
        className="right-0 top-1/2 translate-x-1 -translate-y-1/2"
        label={t('landing.hero.liveDeal.supplier.label')}
        icon={Building2}
      >
        <p className="truncate text-xs font-bold text-foreground dark:text-white">
          {t('landing.hero.liveDeal.supplier.name')}
        </p>
        <div className="mt-1 flex items-center gap-1 text-[10px] text-muted-foreground dark:text-white/55">
          <Star className="h-3 w-3 fill-amber-400 text-amber-400" aria-hidden />
          <span>{t('landing.hero.liveDeal.supplier.rating')}</span>
        </div>
        <p className="mt-0.5 text-[10px] text-muted-foreground dark:text-white/45">
          {t('landing.hero.liveDeal.supplier.location')}
        </p>
      </DealCard>

      <DealCard
        className="bottom-0 left-1/2 -translate-x-1/2 translate-y-1"
        label={t('landing.hero.liveDeal.investors.label')}
        icon={Users}
      >
        <div className="flex items-center justify-between gap-2">
          <AvatarStack />
          <TrendingUp className="h-4 w-4 text-brand-mid dark:text-brand-light" aria-hidden />
        </div>
        <p className="mt-2 text-[9px] uppercase tracking-wide text-muted-foreground dark:text-white/45">
          {t('landing.hero.liveDeal.investors.committed')}
        </p>
        <p className="text-[11px] font-semibold text-brand-mid dark:text-brand-light">
          {t('landing.hero.liveDeal.investors.amount')}
        </p>
      </DealCard>
    </div>
  )
}
