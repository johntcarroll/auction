<script setup>
import { storeToRefs } from "pinia"
import { useTeamStore } from "~~/store/team"
const teamStore = useTeamStore()
const { beGridActive } = storeToRefs(teamStore)
const { setBeGridActive } = teamStore

const typeHeaders = [
  { round: 16, type: "%" },
  { round: 16, type: "$" },
  { round: 8, type: "%" },
  { round: 8, type: "$" },
  { round: 4, type: "%" },
  { round: 4, type: "$" },
  { round: 2, type: "%" },
  { round: 2, type: "$" },
  { round: 1, type: "%" },
  { round: 1, type: "$" },
]

const actualValues = [
  { round: 16, type: "%" },
  { round: 16, type: "$" },
  { round: 8, type: "%" },
  { round: 8, type: "$" },
  { round: 4, type: "%" },
  { round: 4, type: "$" },
  { round: 2, type: "%" },
  { round: 2, type: "$" },
  { round: 1, type: "%" },
  { round: 1, type: "$" },
].map((av) => ({ ...av, pot: "act" }))

const estimatedValues = [
  { round: 16, type: "%" },
  { round: 16, type: "$" },
  { round: 8, type: "%" },
  { round: 8, type: "$" },
  { round: 4, type: "%" },
  { round: 4, type: "$" },
  { round: 2, type: "%" },
  { round: 2, type: "$" },
  { round: 1, type: "%" },
  { round: 1, type: "$" },
].map((ev) => ({ ...ev, pot: "est" }))
defineEmits(["setDollars"])
</script>
<template>
  <div
    class="grid grid-rows-4 grid-cols-11 be-grid"
    @mouseleave="setBeGridActive({ round: null, type: null, pot: null })"
  >
    <div
      @mouseenter="setBeGridActive({ round: null, type: null, pot: null })"
      class="row-span-1 col-span-1 border-r-2"
    ></div>
    <TeamBreakEvenGridRoundHeader
      v-for="round in [16, 8, 4, 2, 1]"
      :round="round"
    />
    <div
      @mouseenter="setBeGridActive({ round: null, type: null, pot: null })"
      class="row-span-1 col-span-1 border-r-2 border-b-2"
    ></div>
    <TeamBreakEvenGridTypeHeader
      v-for="typeHeader in typeHeaders"
      :round="typeHeader.round"
      :type="typeHeader.type"
    />
    <div
      @mouseenter="setBeGridActive({ round: null, type: null, pot: 'act' })"
      :class="{
        active: beGridActive.pot == 'act',
      }"
      class="row-span-1 col-span-1 title border-r-2 border-b-2"
    >
      Actual
    </div>
    <TeamBreakEvenGridValueCell
      v-for="av in actualValues"
      :round="av.round"
      :type="av.type"
      :pot="av.pot"
      @set-dollars="$emit('setDollars', $event)"
    />
    <div
      @mouseenter="setBeGridActive({ round: null, type: null, pot: 'est' })"
      :class="{
        active: beGridActive.pot == 'est',
      }"
      class="col-span-1 title border-r-2 border-b-2"
    >
      Estimated
    </div>
    <TeamBreakEvenGridValueCell
      v-for="ev in estimatedValues"
      :round="ev.round"
      :type="ev.type"
      :pot="ev.pot"
      @set-dollars="$emit('setDollars', $event)"
    />
  </div>
</template>
<style scoped>
.be-grid > div {
  @apply text-center p-2;
}

.be-grid .active {
  @apply bg-slate-400;
}

.be-grid > .title {
  @apply text-right font-bold text-xl;
}
</style>
