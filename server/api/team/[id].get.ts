import { team, getTeam } from "~~/domains/team"

export default defineEventHandler(async (event): Promise<team> => {
  const id = event.context?.params?.id
  if (!id)
    throw createError({
      statusCode: 400,
      statusMessage: "You musst provide an ID",
    })
  return await getTeam(id)
})
