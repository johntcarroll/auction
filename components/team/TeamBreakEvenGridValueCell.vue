<script setup>
import { storeToRefs } from "pinia"
import currencyFormatter from "~~/helpers/currencyFormatter"
import { useTeamsStore } from "~~/store/teams"
import { useTeamStore } from "~~/store/team"
const teamStore = useTeamStore()
const { payouts } = storeToRefs(useTeamsStore())
const { chanceToAdvance, beGridActive } = storeToRefs(teamStore)
const { setBeGridActive } = teamStore
defineProps({
  round: { type: Number, required: true },
  type: { type: String, required: true },
  pot: { type: String, required: true },
})
</script>
<template>
  <div
    @mouseenter="setBeGridActive({ round, type, pot })"
    :class="{
      active:
        (beGridActive.round == round &&
          (beGridActive.type == type || beGridActive.type == null) &&
          beGridActive.pot !== (pot == 'act' ? 'est' : 'act')) ||
        (beGridActive.pot == pot &&
          beGridActive.round == null &&
          beGridActive.type == null),
    }"
    class="value-cell"
  >
    <div v-if="type == '%'">{{ chanceToAdvance[round] * 100 }}%</div>
    <div v-else>
      {{
        currencyFormatter.format(
          chanceToAdvance[round] *
            (pot == "est" ? payouts.estimated[round] : payouts.actual[round])
        )
      }}
    </div>
  </div>
</template>
<style scoped>
.value-cell {
  @apply border-r-2 border-b-2 text-sm italic flex justify-center items-center;
}
</style>
