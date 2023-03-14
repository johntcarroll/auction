<script setup>
import { storeToRefs } from "pinia"
import { useTeamsStore } from "~~/store/teams"
import { useTeamStore } from "~~/store/team"
import currencyFormatter from "~~/helpers/currencyFormatter"
defineProps({
  round: { type: Number, required: true },
})
const teamStore = useTeamStore()
const { beGridActive } = storeToRefs(teamStore)
const { setBeGridActive } = teamStore
const { payouts } = storeToRefs(useTeamsStore())
</script>
<template>
  <div
    @mouseenter="setBeGridActive({ round, type: null, pot: null })"
    :class="{
      active: beGridActive.round == round,
    }"
    class="round-header"
    :payout="` (${currencyFormatter.format(payouts.estimated[round])})`"
  >
    {{ round }}
  </div>
</template>
<style scoped>
.round-header {
  @apply col-span-2 border-b-2 border-r-2 font-extrabold text-2xl after:content-[attr(payout)] after:text-xs after:italic;
}
</style>
