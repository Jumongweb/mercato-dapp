import { createClient } from '@/lib/supabase/server'
import { aggregateDealsToStats, computePymeReputation } from '@/lib/pyme-reputation'
import { PymesList, type Smb } from './pymes-list'

const TIER_ORDER = { top_performer: 0, established: 1, building: 2, new: 3 } as const

export default async function PymesPage() {
  const supabase = await createClient()

  const { data: profiles } = await supabase
    .from('profiles')
    .select('id, company_name, full_name, contact_name, bio, address, phone, email, country, sector')
    .eq('user_type', 'pyme')
    .order('company_name')

  const ids = (profiles ?? []).map((p) => p.id)

  const { data: dealRows } = await supabase
    .from('deals')
    .select('pyme_id, status, amount')
    .in('pyme_id', ids.length ? ids : ['00000000-0000-0000-0000-000000000000'])

  const dealsBySmb: Record<string, { status: string; amount: number }[]> = {}
  for (const p of ids) dealsBySmb[p] = []
  for (const row of dealRows ?? []) {
    const r = row as { pyme_id: string; status: string; amount: number }
    if (!dealsBySmb[r.pyme_id]) dealsBySmb[r.pyme_id] = []
    dealsBySmb[r.pyme_id].push({ status: r.status, amount: r.amount })
  }

  const smbs: Smb[] = (profiles ?? [])
    .map((p) => {
      const deals = dealsBySmb[p.id] ?? []
      const stats = aggregateDealsToStats(deals)
      const rep = computePymeReputation(stats)
      const active_deals = deals.filter(
        (d) => d.status === 'funded' || d.status === 'in_progress',
      ).length
      return {
        id: p.id,
        company_name: p.company_name,
        full_name: p.full_name,
        contact_name: p.contact_name,
        bio: p.bio,
        address: p.address,
        phone: p.phone,
        email: p.email,
        country: p.country,
        sector: p.sector,
        deal_count: deals.length,
        active_deals,
        reputation: rep,
        reputationTier: rep.tier,
        totalRepaid: rep.stats.totalRepaid,
        completionRate: rep.completionRate,
      }
    })
    .toSorted((a, b) => {
      const tierDiff = TIER_ORDER[a.reputationTier] - TIER_ORDER[b.reputationTier]
      if (tierDiff !== 0) return tierDiff
      return b.deal_count - a.deal_count
    })

  return <PymesList initialSmbs={smbs} />
}
