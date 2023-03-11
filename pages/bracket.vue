<script setup>
import { useTeamsStore } from "~~/store/teams"
import { storeToRefs } from "pinia"
definePageMeta({
  title: "Bracket",
})
const teamsStore = useTeamsStore()
const { refresh } = teamsStore
const { teams, error, pending } = storeToRefs(teamsStore)
refresh()
const getTeam = (seed, region) =>
  teams.value.find((team) => team.seed == seed && team.region == region) || {
    owned: false,
    name: "",
  }
const roundOneMatchupsLeft = [
  { topSeed: 1, bottomSeed: 16, region: "N" },
  { topSeed: 8, bottomSeed: 9, region: "N" },
  { topSeed: 5, bottomSeed: 12, region: "N" },
  { topSeed: 4, bottomSeed: 13, region: "N" },
  { topSeed: 6, bottomSeed: 11, region: "N" },
  { topSeed: 3, bottomSeed: 14, region: "N" },
  { topSeed: 7, bottomSeed: 10, region: "N" },
  { topSeed: 2, bottomSeed: 15, region: "N" },
  { topSeed: 1, bottomSeed: 1, region: "W" },
  { topSeed: 8, bottomSeed: 9, region: "W" },
  { topSeed: 5, bottomSeed: 12, region: "W" },
  { topSeed: 4, bottomSeed: 13, region: "W" },
  { topSeed: 6, bottomSeed: 11, region: "W" },
  { topSeed: 3, bottomSeed: 14, region: "W" },
  { topSeed: 7, bottomSeed: 10, region: "W" },
  { topSeed: 2, bottomSeed: 15, region: "W" },
]
const roundOneMatchupsRight = [
  { topSeed: 1, bottomSeed: 16, region: "E" },
  { topSeed: 8, bottomSeed: 9, region: "E" },
  { topSeed: 5, bottomSeed: 12, region: "E" },
  { topSeed: 4, bottomSeed: 13, region: "E" },
  { topSeed: 6, bottomSeed: 11, region: "E" },
  { topSeed: 3, bottomSeed: 14, region: "E" },
  { topSeed: 7, bottomSeed: 10, region: "E" },
  { topSeed: 2, bottomSeed: 15, region: "E" },
  { topSeed: 1, bottomSeed: 1, region: "S" },
  { topSeed: 8, bottomSeed: 9, region: "S" },
  { topSeed: 5, bottomSeed: 12, region: "S" },
  { topSeed: 4, bottomSeed: 13, region: "S" },
  { topSeed: 6, bottomSeed: 11, region: "S" },
  { topSeed: 3, bottomSeed: 14, region: "S" },
  { topSeed: 7, bottomSeed: 10, region: "S" },
  { topSeed: 2, bottomSeed: 15, region: "S" },
]
</script>
<template>
  <div class="h-full">
    <div v-if="pending" class="text-center">Loading...</div>
    <div v-else-if="error" class="text-center">
      There was an error loading the teams
    </div>
    <div v-else class="bracket">
      <div class="round round-1">
        <div class="round-header">
          <div class="round-name"><h4>First Round</h4></div>
          <div class="round-date"><h4>3/16 - 3/17</h4></div>
        </div>
        <div class="round-matchups">
          <BracketMatchup
            v-for="matchup in roundOneMatchupsLeft"
            :top-team-seed="matchup.topSeed"
            :bottom-team-seed="matchup.bottomSeed"
            :region="matchup.region"
          />
        </div>
      </div>
      <div class="round round-2">
        <div class="round-header">
          <div class="round-name"><h4>Round of 32</h4></div>
          <div class="round-date"><h4>3/18 - 3/19</h4></div>
        </div>
        <div class="round-matchups">
          <BracketMatchup v-for="count in [...Array(8).keys()]" />
        </div>
      </div>
      <div class="round round-3">
        <div class="round-header">
          <div class="round-name"><h4>Sweet 16</h4></div>
          <div class="round-date"><h4>3/23 - 3/24</h4></div>
        </div>
        <div class="round-matchups">
          <BracketMatchup v-for="count in [...Array(4).keys()]" />
        </div>
      </div>
      <div class="round round-4">
        <div class="round-header">
          <div class="round-name"><h4>Elite Eight</h4></div>
          <div class="round-date"><h4>3/25 - 3/26</h4></div>
        </div>
        <div class="round-matchups">
          <BracketMatchup v-for="count in [...Array(2).keys()]" />
        </div>
      </div>
      <div class="round round-5">
        <div class="round-header">
          <div class="round-name"><h4>Final Four</h4></div>
          <div class="round-date"><h4>4/1</h4></div>
        </div>
        <div class="round-matchups">
          <BracketMatchup />
        </div>
      </div>
      <div class="round round-6">
        <div class="round-header">
          <div class="round-name"><h4>Championship</h4></div>
          <div class="round-date"><h4>4/3</h4></div>
        </div>
        <div class="championship-matchup">
          <BracketMatchup />
        </div>
      </div>
      <div class="round round-5">
        <div class="round-header">
          <div class="round-name"><h4>Final Four</h4></div>
          <div class="round-date"><h4>4/1</h4></div>
        </div>
        <div class="round-matchups">
          <BracketMatchup />
        </div>
      </div>
      <div class="round round-4">
        <div class="round-header">
          <div class="round-name"><h4>Elite Eight</h4></div>
          <div class="round-date"><h4>3/25 - 3/26</h4></div>
        </div>
        <div class="round-matchups">
          <BracketMatchup v-for="count in [...Array(2).keys()]" />
        </div>
      </div>
      <div class="round round-3">
        <div class="round-header">
          <div class="round-name"><h4>Sweet 16</h4></div>
          <div class="round-date"><h4>3/23 - 3/24</h4></div>
        </div>
        <div class="round-matchups">
          <BracketMatchup v-for="count in [...Array(4).keys()]" />
        </div>
      </div>
      <div class="round round-2">
        <div class="round-header">
          <div class="round-name"><h4>Round of 32</h4></div>
          <div class="round-date"><h4>3/18 - 3/19</h4></div>
        </div>
        <div class="round-matchups">
          <BracketMatchup v-for="count in [...Array(8).keys()]" />
        </div>
      </div>
      <div class="round round-1">
        <div class="round-header">
          <div class="round-name"><h4>First Round</h4></div>
          <div class="round-date"><h4>3/16 - 3/17</h4></div>
        </div>
        <div class="round-matchups">
          <BracketMatchup
            v-for="matchup in roundOneMatchupsRight"
            :top-team-seed="matchup.topSeed"
            :bottom-team-seed="matchup.bottomSeed"
            :region="matchup.region"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.bracket {
  @apply bg-slate-400 rounded p-2 w-full justify-between flex flex-row h-full;
}
.round {
  @apply px-1 flex flex-col;
}

.round-header {
  @apply flex flex-col text-center text-xs;
}

.round-matchups {
  @apply flex flex-col justify-around flex-1;
}

.championship-matchup {
  padding-top: 25rem;
}
</style>
