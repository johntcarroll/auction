import { createClient } from "redis"
export type years = 2016 | 2017 | 2018 | 2019 | 2020 | 2021 | 2022
export type seeds =
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | 13
  | 14
  | 15
  | 16
export interface history {
  year: years
  team: string
  seed: seeds
  price: number
}

export async function getHistory(year?: years): Promise<history[]> {
  const client = createClient()
  await client.connect()
  const keys = await client.keys(year ? `history:${year}:*` : "history:*")
  const teams = (await Promise.all(
    keys.map((key) => client.json.get(key))
  )) as any
  await client.quit()
  return teams
}
