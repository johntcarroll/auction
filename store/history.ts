import { defineStore } from "pinia"
import { history, seeds, years } from "~~/domains/history"

export const useHistoryStore = defineStore("historyStore", () => {
  const loading: Ref<Boolean> = ref(false)
  const error: Ref<Boolean> = ref(false)
  const history: Ref<history[] | []> = ref([])

  const setTeamDataFromServerResponse = (historyFromServer: history[]) => {
    history.value = historyFromServer
  }

  const getHistory = async () => {
    try {
      error.value = false
      loading.value = true
      const { data } = await useFetch(`/api/history`)
      setTeamDataFromServerResponse(data.value || [])
    } catch (e) {
      // todo error handling
      error.value = true
    } finally {
      loading.value = false
    }
  }

  interface byYears {
    2016: any
    2017: any
    2018: any
    2019: any
    2022: any
  }
  interface historyPop {
    percentageOfPot: number
    year: years
    team: string
    seed: seeds
    price: number
  }
  type analysis = {
    lowest?: historyPop
    highest?: historyPop
    average?: number
  }
  type seedA = {
    1: analysis
    2: analysis
    3: analysis
    4: analysis
    5: analysis
    6: analysis
    7: analysis
    8: analysis
    9: analysis
    10: analysis
    11: analysis
    12: analysis
    13: analysis
    14: analysis
    15: analysis
    16: analysis
  }
  const seeds = computed(() => {
    const potTotalByYear: byYears = {
      2016: (history.value as any[])
        .filter((h) => h.year == 2016)
        .reduce((total, h) => (total += h.price), 0),
      2017: (history.value as any[])
        .filter((h) => h.year == 2017)
        .reduce((total, h) => (total += h.price), 0),
      2018: (history.value as any[])
        .filter((h) => h.year == 2018)
        .reduce((total, h) => (total += h.price), 0),
      2019: (history.value as any[])
        .filter((h) => h.year == 2019)
        .reduce((total, h) => (total += h.price), 0),
      2022: (history.value as any[])
        .filter((h) => h.year == 2022)
        .reduce((total, h) => (total += h.price), 0),
    }

    const historyWithPop: historyPop[] = (history.value as any[]).map(
      (h: history) => ({
        ...h,
        percentageOfPot: h.price / potTotalByYear[h.year as keyof byYears],
      })
    )

    const seedAnalysis: seedA = {
      1: {},
      2: {},
      3: {},
      4: {},
      5: {},
      6: {},
      7: {},
      8: {},
      9: {},
      10: {},
      11: {},
      12: {},
      13: {},
      14: {},
      15: {},
      16: {},
    }
    for (let i = 1; i <= 16; i++) {
      let seedHistory = historyWithPop.filter((h: historyPop) => h.seed == i)
      let sorted = seedHistory.sort((a: historyPop, b: historyPop) => {
        if (a.percentageOfPot < b.percentageOfPot) return -1
        if (a.percentageOfPot > b.percentageOfPot) return 1
        else return 0
      })
      seedAnalysis[i as keyof seedA].lowest = sorted[0]
      seedAnalysis[i as keyof seedA].highest = sorted[sorted.length - 1]
      seedAnalysis[i as keyof seedA].average =
        seedHistory.reduce((total, sh) => (total += sh.percentageOfPot), 0) /
        seedHistory.length
    }

    return seedAnalysis
  })

  return {
    loading,
    error,
    getHistory,
    seeds,
  }
})
