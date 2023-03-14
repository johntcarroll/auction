import { createClient } from "redis"
export interface team {
  id: string
  seed?: number
  region?: string
  playin?: boolean
  price: number
  sold: boolean
  elo: number
  owned: boolean
  kenpomRank: number
  name: string
  conference: string
  record: string
  adjustedEfficiencyMargin: number
  adjustedOffensiveEfficiency: number
  adjustedOffensiveEfficiencyRank: number
  adjustedDefensiveEfficiency: number
  adjustedDefensiveEfficiencyRank: number
  adjustedTempo: number
  adjustedTempoRank: number
  luck: number
  luckRank: number
  strengthOfSchedule: number
  strengthOfScheduleRank: number
  opponentAdjustedOffensiveEfficiency: number
  opponentAdjustedOffensiveEfficiencyRank: number
  opponentAdjustedDefensiveEfficiency: number
  opponentAdjustedDefensiveEfficiencyRank: number
  nonConferenceStrengthOfSchedule: number
  nonConferenceStrengthOfScheduleRank: number
  chanceToAdvance: {
    64: number
    32: number
    16: number
    8: number
    4: number
    2: number
    1: number
  }
}

export async function save(
  id: string,
  changes: {
    price?: number
    sold?: boolean
    owned?: boolean
  }
): Promise<team> {
  const client = createClient()
  await client.connect()
  let commands = []
  if (changes.price || changes.price === 0)
    commands.push(client.json.set(id, "price", changes.price))
  if (changes.sold !== null && changes.sold !== undefined)
    commands.push(client.json.set(id, "sold", changes.sold))
  if (changes.owned !== null && changes.owned !== undefined)
    commands.push(client.json.set(id, "owned", changes.owned))
  if (commands.length > 0) await Promise.all(commands)
  return await getTeam(id)
}

export async function getTeams(): Promise<team[]> {
  const client = createClient()
  await client.connect()
  const keys = await client.keys("team:*")
  const teams = (await Promise.all(
    keys.map((key) => client.json.get(key))
  )) as any
  await client.quit()
  return teams
}

export async function getTeam(id: string): Promise<team> {
  const client = createClient()
  await client.connect()
  const team = (await client.json.get(id)) as any
  await client.quit()
  return team
}
