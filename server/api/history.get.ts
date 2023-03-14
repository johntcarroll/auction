import { history, getHistory } from "~~/domains/history"

export default defineEventHandler(async (event): Promise<history[]> => {
  return await getHistory()
})
