<script setup>
import { storeToRefs } from "pinia"
import currencyFormatter from "~~/helpers/currencyFormatter"
import { useTeamsStore } from "~~/store/teams"
import { useTeamStore } from "~~/store/team"
const teamStore = useTeamStore()
const { payouts } = storeToRefs(useTeamsStore())
const { chanceToAdvance, beGridActive } = storeToRefs(teamStore)
const { setBeGridActive } = teamStore
const props = defineProps({
  round: { type: Number, required: true },
  type: { type: String, required: true },
  pot: { type: String, required: true },
})
const emit = defineEmits(["setDollars"])
const cellValue = computed(() =>
  props.type == "%"
    ? chanceToAdvance.value[props.round]
    : chanceToAdvance.value[props.round] *
      (props.pot == "est"
        ? payouts.value.estimated[props.round]
        : payouts.value.actual[props.round])
)
const emitValue = () => {
  if (props.type == "$") emit("setDollars", cellValue.value)
}
</script>
<template>
  <div
    @mouseenter="setBeGridActive({ round, type, pot })"
    :class="{
      'hover:cursor-pointer': type == '$',
      active:
        (beGridActive.round == round &&
          (beGridActive.type == type || beGridActive.type == null) &&
          beGridActive.pot !== (pot == 'act' ? 'est' : 'act')) ||
        (beGridActive.pot == pot &&
          beGridActive.round == null &&
          beGridActive.type == null),
    }"
    class="value-cell"
    @click="emitValue"
  >
    <div v-if="type == '%'">
      {{ (chanceToAdvance[round] * 100).toFixed(3) }}%
    </div>
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
