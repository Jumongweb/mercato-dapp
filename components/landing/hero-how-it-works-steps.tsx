'use client'

import * as React from 'react'
import {
  CheckCircle2,
  FileText,
  Package,
  RefreshCw,
  Truck,
  Wallet,
} from 'lucide-react'
import { useI18n } from '@/lib/i18n/provider'

function useSteps(t: (key: string) => string) {
  return [
    { id: 'order', n: 1, icon: FileText, titleKey: 'landing.flow.order.title', bodyKey: 'landing.flow.order.body', badgeKey: 'landing.flow.order.badge' },
    { id: 'fund', n: 2, icon: Wallet, titleKey: 'landing.flow.fund.title', bodyKey: 'landing.flow.fund.body', badgeKey: 'landing.flow.fund.badge' },
    { id: 'produce', n: 3, icon: Package, titleKey: 'landing.flow.produce.title', bodyKey: 'landing.flow.produce.body', badgeKey: 'landing.flow.produce.badge' },
    { id: 'deliver', n: 4, icon: Truck, titleKey: 'landing.flow.deliver.title', bodyKey: 'landing.flow.deliver.body', badgeKey: 'landing.flow.deliver.badge' },
    { id: 'complete', n: 5, icon: RefreshCw, titleKey: 'landing.flow.complete.title', bodyKey: 'landing.flow.complete.body', badgeKey: 'landing.flow.complete.badge' },
  ] as const
}

export function HeroHowItWorksSteps() {
  const { t } = useI18n()
  const steps = React.useMemo(() => useSteps(t), [t])

  return (
    <div className="grid w-full grid-cols-1 divide-y divide-border/70 sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-5 lg:divide-x lg:divide-y-0 dark:divide-white/10">
      {steps.map((step) => {
        const Icon = step.icon
        return (
          <article
            key={step.id}
            className="flex h-full min-h-0 flex-col bg-card px-5 py-4 sm:px-6 md:py-5 dark:bg-[hsl(0_0%_4%)]"
          >
            <div className="mb-4 flex items-center gap-3">
              <span
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 border-brand-mid/20 bg-brand-ultra text-sm font-bold text-brand-mid dark:border-brand-light/25 dark:bg-brand-mid/15 dark:text-brand-light"
                aria-hidden
              >
                {step.n}
              </span>
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-pale text-brand-mid shadow-sm dark:bg-brand-mid/25 dark:text-brand-light dark:shadow-[0_0_20px_-4px_hsl(var(--brand-light)/0.35)]">
                <Icon className="h-7 w-7 stroke-[1.75]" aria-hidden />
              </span>
            </div>

            <h3 className="mb-1.5 text-[13px] font-semibold leading-snug text-foreground">
              {t(step.titleKey)}
            </h3>
            <p className="mb-4 flex-1 text-[12px] leading-relaxed text-muted-foreground">
              {t(step.bodyKey)}
            </p>

            <p className="mt-auto flex items-start gap-1.5 rounded-lg bg-brand-pale/90 px-2.5 py-2 text-[10px] font-medium leading-snug text-brand-dark dark:bg-brand-mid/15 dark:text-brand-light">
              <CheckCircle2 className="mt-0.5 h-3 w-3 shrink-0 text-brand-mid dark:text-brand-light" aria-hidden />
              <span>{t(step.badgeKey)}</span>
            </p>
          </article>
        )
      })}
    </div>
  )
}
