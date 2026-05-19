/** Anchor targets on the marketing homepage (`/`). */
export const LANDING_SECTION_IDS = {
  whyMercato: 'why-mercato',
  roles: 'roles',
  howItWorks: 'how-it-works',
  liveDeals: 'live-deals',
  faq: 'faq',
} as const

export type LandingSectionId =
  (typeof LANDING_SECTION_IDS)[keyof typeof LANDING_SECTION_IDS]

export const PUBLIC_NAV_LINKS = [
  { sectionId: LANDING_SECTION_IDS.whyMercato, labelKey: 'nav.whyMercato' },
  { sectionId: LANDING_SECTION_IDS.roles, labelKey: 'nav.roles' },
  { sectionId: LANDING_SECTION_IDS.howItWorks, labelKey: 'nav.howItWorks' },
  { sectionId: LANDING_SECTION_IDS.liveDeals, labelKey: 'nav.liveDeals' },
  { sectionId: LANDING_SECTION_IDS.faq, labelKey: 'nav.faq' },
] as const

export function landingSectionHref(sectionId: LandingSectionId, onHome: boolean) {
  return onHome ? `#${sectionId}` : `/#${sectionId}`
}
