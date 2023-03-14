<script setup>
import { storeToRefs } from "pinia"
import currencyFormatter from "~~/helpers/currencyFormatter"
import { useTeamsStore } from "~~/store/teams"
import { useTeamStore } from "~~/store/team"
import { useHistoryStore } from "~~/store/history"

const historyStore = useHistoryStore()
const { seeds, loading: hsLoading, error: hsError } = storeToRefs(historyStore)
const { getHistory } = historyStore
const { payouts, totalPot, estimatedPot } = storeToRefs(useTeamsStore())

const { id, price, owned, sold, core, stats, chanceToAdvance, loading, error } =
  storeToRefs(useTeamStore())
const { setPrice, setOwned, setSold } = useTeamStore()

const domPrice = computed({
  get() {
    return price.value
  },
  set(newPrice) {
    setPrice(newPrice)
  },
})

const domSold = computed({
  get() {
    return sold.value
  },
  set(newSold) {
    setSold(newSold)
  },
})

const domOwned = computed({
  get() {
    return owned.value
  },
  set(newOwned) {
    setOwned(newOwned)
  },
})

const statBoxes = computed(() => [
  {
    stat: stats.value.adjustedEfficiencyMargin,
    rank: null,
    name: "Adj. Efficiency Margin",
  },
  {
    stat: stats.value.adjustedOffensiveEfficiency,
    rank: stats.value.adjustedOffensiveEfficiencyRank,
    name: "Adj. Offensive Efficiency",
  },
  {
    stat: stats.value.adjustedDefensiveEfficiency,
    rank: stats.value.adjustedDefensiveEfficiencyRank,
    name: "Adj. Defensive Efficiency",
  },
  {
    stat: stats.value.strengthOfSchedule,
    rank: stats.value.strengthOfScheduleRank,
    name: "Strength of Schedule",
  },
  {
    stat: stats.value.opponentAdjustedOffensiveEfficiency,
    rank: stats.value.opponentAdjustedOffensiveEfficiencyRank,
    name: "Opp. Adj. Offensive Efficiency",
  },
  {
    stat: stats.value.opponentAdjustedDefensiveEfficiency,
    rank: stats.value.opponentAdjustedDefensiveEfficiencyRank,
    name: "Opp. Adj. Defensive Efficiency",
  },
  {
    stat: stats.value.nonConferenceStrengthOfSchedule,
    rank: stats.value.nonConferenceStrengthOfScheduleRank,
    name: "Non-Con. Strength of Schedule",
  },
  {
    stat: stats.value.adjustedTempo,
    rank: stats.value.adjustedTempoRank,
    name: "Adj. Tempo",
  },
  {
    stat: stats.value.luck,
    rank: stats.value.luckRank,
    name: "Luck",
  },
])
const priceExperiment = ref(0)
const setDollars = (e) => {
  priceExperiment.value = e
}
const route = useRoute()
id.value = route.params.id
getHistory()
</script>
<template>
  <div>
    <div v-if="loading || hsLoading">Loading...</div>
    <div v-else-if="error || hsError">There was an error.</div>
    <div v-else class="flex flex-col">
      <LayoutCard :title="`${core.name} - ${core.conference} (${core.record})`">
        <template #body>
          <div class="flex flex-row justify-around text-center border-b-2 p-2">
            <div class="flex flex-col">
              <div class="stat-value">
                {{ core.kenpomRank }}
              </div>
              <h6>Ken Pom Rank</h6>
            </div>
            <div class="flex flex-col">
              <div class="stat-value">
                {{ core.region }}
              </div>
              <h6>Region</h6>
            </div>
            <div class="flex flex-col">
              <div class="stat-value">
                {{ core.seed }}
              </div>
              <h6>Seed</h6>
            </div>
          </div>
          <div class="flex flex-row justify-center items-center p-2 border-b-2">
            <div class="headline">Price:</div>
            <FormNumberInput
              v-model="domPrice"
              name="newPrice"
              :disabled="loading"
            />
            <div class="headline">Sold:</div>
            <FormCheckbox
              class="p-2"
              v-model="domSold"
              name="newSold"
              :disabled="loading"
            />
            <div class="headline">Owned:</div>
            <FormCheckbox
              class="p-2"
              v-model="domOwned"
              name="newSold"
              :disabled="loading"
            />
          </div>
          <TeamBreakEvenGrid @set-dollars="setDollars" />
          <div class="p-4 flex flex-col">
            <div>
              <label
                for="default-range"
                class="block mb-2 uppercase tracking-widest"
                >{{ core.seed }} seed price analysis</label
              >
              <input
                id="default-range"
                type="range"
                v-model="priceExperiment"
                :min="0"
                :max="1000"
                :step="1"
                class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
              />
            </div>
          </div>
          <div class="flex flex-row justify-between p-4 border-b-2">
            <div class="grid grid-rows-4 grid-cols-2 gap-2 text-center">
              <h6 class="col-span-2">Lowest All Time</h6>
              <div class="price-title">% of Pot</div>
              <div>
                {{
                  (seeds[core.seed]?.lowest.percentageOfPot * 100).toFixed(2)
                }}%
              </div>
              <div class="price-title">Team</div>
              <div>{{ seeds[core.seed]?.lowest.team }}</div>
              <div class="price-title">Year</div>
              <div>{{ seeds[core.seed]?.lowest.year }}</div>
            </div>
            <div class="grid grid-rows-4 grid-cols-2 gap-2 text-center">
              <div class="price-title">Price</div>
              <div>
                {{ currencyFormatter.format(priceExperiment) }}
              </div>
              <div class="price-title">% of Act. Pot</div>
              <div>
                {{
                  (totalPot !== 0
                    ? (priceExperiment / totalPot) * 100
                    : 0
                  ).toFixed(2)
                }}%
              </div>
              <div class="price-title">% of Est. Pot</div>
              <div>
                {{
                  (estimatedPot !== 0
                    ? (priceExperiment / estimatedPot) * 100
                    : 0
                  ).toFixed(2)
                }}%
              </div>
              <div class="price-title">Historical Avg.</div>
              <div>{{ (seeds[core.seed]?.average * 100).toFixed(2) }}%</div>
            </div>
            <div class="grid grid-rows-4 grid-cols-2 gap-2 text-center">
              <h6 class="col-span-2">Highest All Time</h6>
              <div class="price-title">% of Pot</div>
              <div>
                {{
                  (seeds[core.seed]?.highest.percentageOfPot * 100).toFixed(2)
                }}%
              </div>
              <div class="price-title">Team</div>
              <div>{{ seeds[core.seed]?.highest.team }}</div>
              <div class="price-title">Year</div>
              <div>{{ seeds[core.seed]?.highest.year }}</div>
            </div>
          </div>

          <div class="grid grid-cols-3 grid-rows-3 gap-8 pt-8 py-4">
            <TeamStat
              v-for="box in statBoxes"
              :stat="box.stat"
              :rank="box.rank"
              :name="box.name"
            />
          </div>
        </template>
      </LayoutCard>
    </div>
  </div>
</template>
<style scoped>
.headline {
  @apply p-4 text-2xl tracking-widest;
}

.price-title {
  @apply font-bold italic tracking-wider;
}
</style>
