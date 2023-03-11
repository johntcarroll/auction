<script setup>
import { storeToRefs } from "pinia"
import { useTeamStore } from "~~/store/team"
defineProps({
  round: { type: Number, required: true },
  type: { type: String, required: true },
})
const teamStore = useTeamStore()
const { beGridActive } = storeToRefs(teamStore)
const { setBeGridActive } = teamStore
</script>
<template>
  <div
    @mouseenter="setBeGridActive({ round, type, pot: null })"
    :class="{
      active:
        (beGridActive.round == round && beGridActive.type == null) ||
        (beGridActive.round == round && beGridActive.type == type),
    }"
    class="round-type-header"
  >
    {{ type }}
  </div>
</template>
<style scoped>
.round-type-header {
  @apply border-b-2 border-r-2 font-bold text-xl;
}
</style>
