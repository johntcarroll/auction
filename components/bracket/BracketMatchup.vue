<script setup>
import { useTeamsStore } from "~~/store/teams"
import { storeToRefs } from "pinia"
const { teams } = storeToRefs(useTeamsStore())
const getTeam = (seed, region) =>
  teams.value.find((team) => team.seed == seed && team.region == region) || {
    owned: false,
    name: "",
  }
const props = defineProps({
  topTeamSeed: { type: Number, required: false },
  bottomTeamSeed: { type: Number, required: false },
  region: { type: String, required: false },
})
const topSeed = computed(() =>
  props.topTeamSeed && props.region
    ? getTeam(props.topTeamSeed, props.region)
    : { seed: "?", owned: false, sold: false, name: "" }
)
const bottomSeed = computed(() =>
  props.bottomTeamSeed && props.region
    ? getTeam(props.bottomTeamSeed, props.region)
    : { seed: "?", owned: false, sold: false, name: "" }
)
const router = useRouter()
</script>
<template>
  <div class="matchup">
    <div
      v-if="topSeed"
      :seed="topSeed.seed"
      class="home hover:cursor-pointer"
      @click="router.push({ path: `/team/${topSeed.id}` })"
      :class="{
        owned: topSeed.owned,
        sold: topSeed.sold && !topSeed.owned,
      }"
    >
      <span class="team-name">{{ topSeed.name }}</span>
    </div>
    <div
      v-if="bottomSeed"
      :seed="bottomSeed.seed"
      class="away hover:cursor-pointer"
      @click="router.push({ path: `/team/${bottomSeed.id}` })"
      :class="{
        owned: bottomSeed.owned,
        sold: bottomSeed.sold && !bottomSeed.owned,
      }"
    >
      <span class="team-name">{{ bottomSeed.name }}</span>
    </div>
  </div>
</template>
<style scoped>
.matchup {
  @apply flex flex-col text-xs;
}

.home {
  @apply mb-1;
}

.home,
.away {
  @apply w-full bg-slate-200 before:content-[attr(seed)] p-1 text-slate-900 flex;
}
.team-name {
  @apply flex-1 text-center;
}

.owned {
  @apply before:content-['$$'] bg-green-300;
}

.sold {
  @apply bg-red-300;
}

.sold .team-name {
  @apply line-through;
}
</style>
