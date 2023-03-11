import { defineStore } from "pinia"
export const useTeamsStore = defineStore("teamsStore", () => {
  const { data, error, pending, refresh } = useFetch("/api/teams")
  const totalPot = computed(() => {
    return data.value?.reduce((total, team) => total + team.price, 0)
  })
  const teamsRemaining = computed(() => {
    return data.value?.filter((team) => !team.sold).length
  })
  const estimatedPot = ref(5000)

  const dollarsSpent = computed(() =>
    data.value
      ?.filter((team) => team.owned)
      .reduce((total, team) => total + team.price, 0)
  )

  const payouts = computed(() => ({
    actual: {
      16: totalPot.value ? totalPot.value / 80 : 0,
      8: totalPot.value ? totalPot.value / 40 + totalPot.value / 80 : 0,
      4: totalPot.value
        ? totalPot.value / 20 + totalPot.value / 40 + totalPot.value / 80
        : 0,
      2: totalPot.value
        ? totalPot.value / 10 +
          totalPot.value / 20 +
          totalPot.value / 40 +
          totalPot.value / 80
        : 0,
      1: totalPot.value
        ? totalPot.value / 5 +
          totalPot.value / 10 +
          totalPot.value / 20 +
          totalPot.value / 40 +
          totalPot.value / 80
        : 0,
    },
    estimated: {
      16: estimatedPot.value ? estimatedPot.value / 80 : 0,
      8: estimatedPot.value
        ? estimatedPot.value / 40 + estimatedPot.value / 80
        : 0,
      4: estimatedPot.value
        ? estimatedPot.value / 20 +
          estimatedPot.value / 40 +
          estimatedPot.value / 80
        : 0,
      2: estimatedPot.value
        ? estimatedPot.value / 10 +
          estimatedPot.value / 20 +
          estimatedPot.value / 40 +
          estimatedPot.value / 80
        : 0,
      1: estimatedPot.value
        ? estimatedPot.value / 5 +
          estimatedPot.value / 10 +
          estimatedPot.value / 20 +
          estimatedPot.value / 40 +
          estimatedPot.value / 80
        : 0,
    },
  }))
  return {
    teams: data,
    error,
    pending,
    refresh,
    totalPot,
    teamsRemaining,
    estimatedPot,
    payouts,
    dollarsSpent,
  }
})
