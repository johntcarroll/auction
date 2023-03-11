<script setup>
import { storeToRefs } from "pinia"
import currencyFormatter from "~~/helpers/currencyFormatter"
import { useTeamsStore } from "~~/store/teams"
import { useTeamStore } from "~~/store/team"

const { payouts } = storeToRefs(useTeamsStore())

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
const beGridActive = reactive({
  round: null,
  type: null,
  pot: null,
})

const setBeGridActive = ({ round, type, pot }) => {
  beGridActive.round = round
  beGridActive.type = type
  beGridActive.pot = pot
}

const activeRound = computed(() => beGridActive.round)
const activeType = computed(() => beGridActive.type)
const activePot = computed(() => beGridActive.pot)

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
    stat: stats.value.luckRank,
    name: "Luck",
  },
])

const route = useRoute()
id.value = route.params.id
</script>
<template>
  <div>
    <div v-if="loading">Loading...</div>
    <div v-else-if="error">There was an error.</div>
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
          <div
            class="grid grid-rows-4 grid-cols-11 be-grid"
            @mouseleave="
              setBeGridActive({ round: null, type: null, pot: null })
            "
          >
            <div
              @mouseenter="
                setBeGridActive({ round: null, type: null, pot: null })
              "
              class="row-span-1 col-span-1 border-r-2"
            ></div>
            <div
              @mouseenter="
                setBeGridActive({ round: 16, type: null, pot: null })
              "
              :class="{
                active: activeRound == 16,
              }"
              class="round-header"
            >
              16
            </div>
            <div
              @mouseenter="setBeGridActive({ round: 8, type: null, pot: null })"
              :class="{
                active: activeRound == 8,
              }"
              class="round-header"
            >
              8
            </div>
            <div
              @mouseenter="setBeGridActive({ round: 4, type: null, pot: null })"
              :class="{
                active: activeRound == 4,
              }"
              class="round-header"
            >
              4
            </div>
            <div
              @mouseenter="setBeGridActive({ round: 2, type: null, pot: null })"
              :class="{
                active: activeRound == 2,
              }"
              class="round-header"
            >
              2
            </div>
            <div
              @mouseenter="setBeGridActive({ round: 1, type: null, pot: null })"
              :class="{
                active: activeRound == 1,
              }"
              class="round-header"
            >
              1
            </div>
            <div
              @mouseenter="
                setBeGridActive({ round: null, type: null, pot: null })
              "
              class="row-span-1 col-span-1 border-r-2 border-b-2"
            ></div>
            <div
              @mouseenter="setBeGridActive({ round: 16, type: '%', pot: null })"
              :class="{
                active:
                  (activeRound == 16 && activeType == null) ||
                  (activeRound == 16 && activeType == '%'),
              }"
              class="round-type-header"
            >
              %
            </div>
            <div
              @mouseenter="setBeGridActive({ round: 16, type: '$', pot: null })"
              :class="{
                active:
                  (activeRound == 16 && activeType == null) ||
                  (activeRound == 16 && activeType == '$'),
              }"
              class="round-type-header"
            >
              B/E $
            </div>
            <div
              @mouseenter="setBeGridActive({ round: 8, type: '%', pot: null })"
              :class="{
                active:
                  (activeRound == 8 && activeType == null) ||
                  (activeRound == 8 && activeType == '%'),
              }"
              class="round-type-header"
            >
              %
            </div>
            <div
              @mouseenter="setBeGridActive({ round: 8, type: '$', pot: null })"
              :class="{
                active:
                  (activeRound == 8 && activeType == null) ||
                  (activeRound == 8 && activeType == '$'),
              }"
              class="round-type-header"
            >
              B/E $
            </div>
            <div
              @mouseenter="setBeGridActive({ round: 4, type: '%', pot: null })"
              :class="{
                active:
                  (activeRound == 4 && activeType == null) ||
                  (activeRound == 4 && activeType == '%'),
              }"
              class="round-type-header"
            >
              %
            </div>
            <div
              @mouseenter="setBeGridActive({ round: 4, type: '$', pot: null })"
              :class="{
                active:
                  (activeRound == 4 && activeType == null) ||
                  (activeRound == 4 && activeType == '$'),
              }"
              class="round-type-header"
            >
              B/E $
            </div>
            <div
              @mouseenter="setBeGridActive({ round: 2, type: '%', pot: null })"
              :class="{
                active:
                  (activeRound == 2 && activeType == null) ||
                  (activeRound == 2 && activeType == '%'),
              }"
              class="round-type-header"
            >
              %
            </div>
            <div
              @mouseenter="setBeGridActive({ round: 2, type: '$', pot: null })"
              :class="{
                active:
                  (activeRound == 2 && activeType == null) ||
                  (activeRound == 2 && activeType == '$'),
              }"
              class="round-type-header"
            >
              B/E $
            </div>
            <div
              @mouseenter="setBeGridActive({ round: 1, type: '%', pot: null })"
              :class="{
                active:
                  (activeRound == 1 && activeType == null) ||
                  (activeRound == 1 && activeType == '%'),
              }"
              class="round-type-header"
            >
              %
            </div>
            <div
              @mouseenter="setBeGridActive({ round: 1, type: '$', pot: null })"
              :class="{
                active:
                  (activeRound == 1 && activeType == null) ||
                  (activeRound == 1 && activeType == '$'),
              }"
              class="round-type-header"
            >
              B/E $
            </div>
            <div
              @mouseenter="
                setBeGridActive({ round: null, type: null, pot: 'act' })
              "
              :class="{
                active: activePot == 'act',
              }"
              class="row-span-1 col-span-1 title border-r-2 border-b-2"
            >
              Actual
            </div>
            <div
              @mouseenter="
                setBeGridActive({ round: 16, type: '%', pot: 'act' })
              "
              :class="{
                active:
                  (activeRound == 16 &&
                    (activeType == '%' || activeType == null) &&
                    activePot !== 'est') ||
                  (activePot == 'act' &&
                    activeRound == null &&
                    activeType == null),
              }"
              class="value-cell"
            >
              <div>{{ chanceToAdvance[16] * 100 }}%</div>
            </div>
            <div
              @mouseenter="
                setBeGridActive({ round: 16, type: '$', pot: 'act' })
              "
              :class="{
                active:
                  (activeRound == 16 &&
                    (activeType == '$' || activeType == null) &&
                    activePot !== 'est') ||
                  (activePot == 'act' &&
                    activeRound == null &&
                    activeType == null),
              }"
              class="value-cell"
            >
              <div>
                {{
                  currencyFormatter.format(
                    chanceToAdvance[16] * payouts.actual[16]
                  )
                }}
              </div>
            </div>
            <div
              @mouseenter="setBeGridActive({ round: 8, type: '%', pot: 'act' })"
              :class="{
                active:
                  (activeRound == 8 &&
                    (activeType == '%' || activeType == null) &&
                    activePot !== 'est') ||
                  (activePot == 'act' &&
                    activeRound == null &&
                    activeType == null),
              }"
              class="value-cell"
            >
              <div>{{ chanceToAdvance[8] * 100 }}%</div>
            </div>
            <div
              @mouseenter="setBeGridActive({ round: 8, type: '$', pot: 'act' })"
              :class="{
                active:
                  (activeRound == 8 &&
                    (activeType == '$' || activeType == null) &&
                    activePot !== 'est') ||
                  (activePot == 'act' &&
                    activeRound == null &&
                    activeType == null),
              }"
              class="value-cell"
            >
              <div>
                {{
                  currencyFormatter.format(
                    chanceToAdvance[8] * payouts.actual[8]
                  )
                }}
              </div>
            </div>
            <div
              @mouseenter="setBeGridActive({ round: 4, type: '%', pot: 'act' })"
              :class="{
                active:
                  (activeRound == 4 &&
                    (activeType == '%' || activeType == null) &&
                    activePot !== 'est') ||
                  (activePot == 'act' &&
                    activeRound == null &&
                    activeType == null),
              }"
              class="value-cell"
            >
              <div>{{ chanceToAdvance[4] * 100 }}%</div>
            </div>
            <div
              @mouseenter="setBeGridActive({ round: 4, type: '$', pot: 'act' })"
              :class="{
                active:
                  (activeRound == 4 &&
                    (activeType == '$' || activeType == null) &&
                    activePot !== 'est') ||
                  (activePot == 'act' &&
                    activeRound == null &&
                    activeType == null),
              }"
              class="value-cell"
            >
              <div>
                {{
                  currencyFormatter.format(
                    chanceToAdvance[4] * payouts.actual[4]
                  )
                }}
              </div>
            </div>
            <div
              @mouseenter="setBeGridActive({ round: 2, type: '%', pot: 'act' })"
              :class="{
                active:
                  (activeRound == 2 &&
                    (activeType == '%' || activeType == null) &&
                    activePot !== 'est') ||
                  (activePot == 'act' &&
                    activeRound == null &&
                    activeType == null),
              }"
              class="value-cell"
            >
              <div>{{ chanceToAdvance[2] * 100 }}%</div>
            </div>
            <div
              @mouseenter="setBeGridActive({ round: 2, type: '$', pot: 'act' })"
              :class="{
                active:
                  (activeRound == 2 &&
                    (activeType == '$' || activeType == null) &&
                    activePot !== 'est') ||
                  (activePot == 'act' &&
                    activeRound == null &&
                    activeType == null),
              }"
              class="value-cell"
            >
              <div>
                {{
                  currencyFormatter.format(
                    chanceToAdvance[2] * payouts.actual[2]
                  )
                }}
              </div>
            </div>
            <div
              @mouseenter="setBeGridActive({ round: 1, type: '%', pot: 'act' })"
              :class="{
                active:
                  (activeRound == 1 &&
                    (activeType == '%' || activeType == null) &&
                    activePot !== 'est') ||
                  (activePot == 'act' &&
                    activeRound == null &&
                    activeType == null),
              }"
              class="value-cell"
            >
              <div>{{ chanceToAdvance[1] * 100 }}%</div>
            </div>
            <div
              @mouseenter="setBeGridActive({ round: 1, type: '$', pot: 'act' })"
              :class="{
                active:
                  (activeRound == 1 &&
                    (activeType == '$' || activeType == null) &&
                    activePot !== 'est') ||
                  (activePot == 'act' &&
                    activeRound == null &&
                    activeType == null),
              }"
              class="value-cell"
            >
              <div>
                {{
                  currencyFormatter.format(
                    chanceToAdvance[1] * payouts.actual[1]
                  )
                }}
              </div>
            </div>
            <div
              @mouseenter="
                setBeGridActive({ round: null, type: null, pot: 'est' })
              "
              :class="{
                active: activePot == 'est',
              }"
              class="col-span-1 title border-r-2 border-b-2"
            >
              Estimated
            </div>
            <div
              @mouseenter="
                setBeGridActive({ round: 16, type: '%', pot: 'est' })
              "
              :class="{
                active:
                  (activeRound == 16 &&
                    (activeType == '%' || activeType == null) &&
                    activePot !== 'act') ||
                  (activePot == 'est' &&
                    activeRound == null &&
                    activeType == null),
              }"
              class="value-cell"
            >
              <div>{{ chanceToAdvance[16] * 100 }}%</div>
            </div>
            <div
              @mouseenter="
                setBeGridActive({ round: 16, type: '$', pot: 'est' })
              "
              :class="{
                active:
                  (activeRound == 16 &&
                    (activeType == '$' || activeType == null) &&
                    activePot !== 'act') ||
                  (activePot == 'est' &&
                    activeRound == null &&
                    activeType == null),
              }"
              class="value-cell"
            >
              <div>
                {{
                  currencyFormatter.format(
                    chanceToAdvance[16] * payouts.estimated[16]
                  )
                }}
              </div>
            </div>
            <div
              @mouseenter="setBeGridActive({ round: 8, type: '%', pot: 'est' })"
              :class="{
                active:
                  (activeRound == 8 &&
                    (activeType == '%' || activeType == null) &&
                    activePot !== 'act') ||
                  (activePot == 'est' &&
                    activeRound == null &&
                    activeType == null),
              }"
              class="value-cell"
            >
              <div>{{ chanceToAdvance[8] * 100 }}%</div>
            </div>
            <div
              @mouseenter="setBeGridActive({ round: 8, type: '$', pot: 'est' })"
              :class="{
                active:
                  (activeRound == 8 &&
                    (activeType == '$' || activeType == null) &&
                    activePot !== 'act') ||
                  (activePot == 'est' &&
                    activeRound == null &&
                    activeType == null),
              }"
              class="value-cell"
            >
              <div>
                {{
                  currencyFormatter.format(
                    chanceToAdvance[8] * payouts.estimated[8]
                  )
                }}
              </div>
            </div>
            <div
              @mouseenter="setBeGridActive({ round: 4, type: '%', pot: 'est' })"
              :class="{
                active:
                  (activeRound == 4 &&
                    (activeType == '%' || activeType == null) &&
                    activePot !== 'act') ||
                  (activePot == 'est' &&
                    activeRound == null &&
                    activeType == null),
              }"
              class="value-cell"
            >
              <div>{{ chanceToAdvance[4] * 100 }}%</div>
            </div>
            <div
              @mouseenter="setBeGridActive({ round: 4, type: '$', pot: 'est' })"
              :class="{
                active:
                  (activeRound == 4 &&
                    (activeType == '$' || activeType == null) &&
                    activePot !== 'act') ||
                  (activePot == 'est' &&
                    activeRound == null &&
                    activeType == null),
              }"
              class="value-cell"
            >
              <div>
                {{
                  currencyFormatter.format(
                    chanceToAdvance[4] * payouts.estimated[4]
                  )
                }}
              </div>
            </div>
            <div
              @mouseenter="setBeGridActive({ round: 2, type: '%', pot: 'est' })"
              :class="{
                active:
                  (activeRound == 2 &&
                    (activeType == '%' || activeType == null) &&
                    activePot !== 'act') ||
                  (activePot == 'est' &&
                    activeRound == null &&
                    activeType == null),
              }"
              class="value-cell"
            >
              <div>{{ chanceToAdvance[2] * 100 }}%</div>
            </div>
            <div
              @mouseenter="setBeGridActive({ round: 2, type: '$', pot: 'est' })"
              :class="{
                active:
                  (activeRound == 2 &&
                    (activeType == '$' || activeType == null) &&
                    activePot !== 'act') ||
                  (activePot == 'est' &&
                    activeRound == null &&
                    activeType == null),
              }"
              class="value-cell"
            >
              <div>
                {{
                  currencyFormatter.format(
                    chanceToAdvance[2] * payouts.estimated[2]
                  )
                }}
              </div>
            </div>
            <div
              @mouseenter="setBeGridActive({ round: 1, type: '%', pot: 'est' })"
              :class="{
                active:
                  (activeRound == 1 &&
                    (activeType == '%' || activeType == null) &&
                    activePot !== 'act') ||
                  (activePot == 'est' &&
                    activeRound == null &&
                    activeType == null),
              }"
              class="value-cell"
            >
              <div>{{ chanceToAdvance[1] * 100 }}%</div>
            </div>
            <div
              @mouseenter="setBeGridActive({ round: 1, type: '$', pot: 'est' })"
              :class="{
                active:
                  (activeRound == 1 &&
                    (activeType == '$' || activeType == null) &&
                    activePot !== 'act') ||
                  (activePot == 'est' &&
                    activeRound == null &&
                    activeType == null),
              }"
              class="value-cell"
            >
              <div>
                {{
                  currencyFormatter.format(
                    chanceToAdvance[1] * payouts.estimated[1]
                  )
                }}
              </div>
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
.grid-cols-16 {
  grid-template-columns: repeat(16, minmax(0, 1fr));
}

.be-grid > div {
  @apply text-center p-2;
}

.be-grid .active {
  @apply bg-slate-400;
}

.be-grid > .title {
  @apply text-right font-bold text-xl;
}

.round-header {
  @apply col-span-2 border-b-2 border-r-2 font-extrabold text-2xl;
}

.round-type-header {
  @apply border-b-2 border-r-2 font-bold text-xl;
}

.value-cell {
  @apply border-r-2 border-b-2 text-sm italic flex justify-center items-center;
}
</style>
