import { defineStore } from "pinia"
import { team } from "~~/domains/team"
import { useTeamsStore } from "./teams"
export const useTeamStore = defineStore("teamStore", () => {
  const { refresh: refreshTeams } = useTeamsStore()
  const loading: Ref<Boolean> = ref(false)
  const error: Ref<Boolean> = ref(false)

  const team: Ref<team | null> = ref(null)
  const id: Ref<string | null> = ref(null)
  const price: Ref<number | null> = ref(null)
  const owned: Ref<boolean | null> = ref(null)
  const sold: Ref<boolean | null> = ref(null)

  const setTeamDataFromServerResponse = (teamFromServer: team | null) => {
    if (!teamFromServer) return
    team.value = teamFromServer
    price.value = teamFromServer.price
    owned.value = teamFromServer.owned
    sold.value = teamFromServer.sold
  }

  const getTeam = async () => {
    try {
      error.value = false
      loading.value = true
      const { data } = await useFetch(`/api/team/${id.value}`)
      setTeamDataFromServerResponse(data.value)
    } catch (e) {
      // todo error handling
      error.value = true
    } finally {
      loading.value = false
    }
  }

  const saveTeam = async () => {
    try {
      error.value = false
      loading.value = true
      const { data } = await useFetch(`/api/team/${id.value}`, {
        method: "POST",
        body: {
          price: price.value,
          owned: owned.value,
          sold: sold.value,
        },
      })
      setTeamDataFromServerResponse(data.value)
      refreshTeams()
    } catch (e) {
      // todo error handling
      error.value = true
    } finally {
      loading.value = false
    }
  }

  const core = computed(() => ({
    name: team.value?.name,
    seed: team.value?.seed,
    region: team.value?.region,
    playin: team.value?.playin,
    kenpomRank: team.value?.kenpomRank,
    conference: team.value?.conference,
    record: team.value?.record,
  }))

  const stats = computed(() => ({
    adjustedEfficiencyMargin: team.value?.adjustedEfficiencyMargin,
    adjustedOffensiveEfficiency: team.value?.adjustedOffensiveEfficiency,
    adjustedOffensiveEfficiencyRank:
      team.value?.adjustedOffensiveEfficiencyRank,
    adjustedDefensiveEfficiency: team.value?.adjustedDefensiveEfficiency,
    adjustedDefensiveEfficiencyRank:
      team.value?.adjustedDefensiveEfficiencyRank,
    adjustedTempo: team.value?.adjustedTempo,
    adjustedTempoRank: team.value?.adjustedTempoRank,
    luck: team.value?.luck,
    luckRank: team.value?.luckRank,
    strengthOfSchedule: team.value?.strengthOfSchedule,
    strengthOfScheduleRank: team.value?.strengthOfScheduleRank,
    opponentAdjustedOffensiveEfficiency:
      team.value?.opponentAdjustedOffensiveEfficiency,
    opponentAdjustedOffensiveEfficiencyRank:
      team.value?.opponentAdjustedOffensiveEfficiencyRank,
    opponentAdjustedDefensiveEfficiency:
      team.value?.opponentAdjustedDefensiveEfficiency,
    opponentAdjustedDefensiveEfficiencyRank:
      team.value?.opponentAdjustedDefensiveEfficiencyRank,
    nonConferenceStrengthOfSchedule:
      team.value?.nonConferenceStrengthOfSchedule,
    nonConferenceStrengthOfScheduleRank:
      team.value?.nonConferenceStrengthOfScheduleRank,
  }))

  const chanceToAdvance = computed(() => ({
    64: team.value?.chanceToAdvance[64],
    32: team.value?.chanceToAdvance[32],
    16: team.value?.chanceToAdvance[16],
    8: team.value?.chanceToAdvance[8],
    4: team.value?.chanceToAdvance[4],
    2: team.value?.chanceToAdvance[2],
    1: team.value?.chanceToAdvance[1],
  }))

  watch(id, async () => {
    await getTeam()
  })

  let saveTeamDebounce: Ref<NodeJS.Timeout | null> = ref(null)
  const _saveTeam = () => {
    if (saveTeamDebounce.value) clearTimeout(saveTeamDebounce.value)
    saveTeamDebounce.value = setTimeout(async () => await saveTeam(), 500)
  }
  const setPrice = (newPrice: number) => {
    price.value = newPrice
    _saveTeam()
  }

  const setSold = (newSold: boolean) => {
    sold.value = newSold
    _saveTeam()
  }

  const setOwned = (newOwned: boolean) => {
    owned.value = newOwned
    _saveTeam()
  }

  return {
    id,
    price,
    owned,
    sold,
    saveTeam,
    core,
    stats,
    chanceToAdvance,
    loading,
    error,
    setPrice,
    setSold,
    setOwned,
  }
})
