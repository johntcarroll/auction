import { team, getTeams } from "~~/domains/team"

export default defineEventHandler(async (event): Promise<team[]> => {
  return await getTeams()
})
