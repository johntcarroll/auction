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
          <div class="matchup">
            <div
              seed="1"
              class="home"
              :class="{
                owned: getTeam(1, 'N').owned,
                sold: getTeam(1, 'N').sold && !getTeam(1, 'N').owned,
              }"
            >
              <span class="team-name">{{ getTeam(1, "N").name }}</span>
            </div>
            <div
              seed="16"
              class="away"
              :class="{
                owned: getTeam(16, 'N').owned,
                sold: getTeam(16, 'N').sold && !getTeam(16, 'N').owned,
              }"
            >
              <span class="team-name">{{ getTeam(16, "N").name }}</span>
            </div>
          </div>
          <div class="matchup">
            <div
              seed="8"
              class="home"
              :class="{
                owned: getTeam(8, 'N').owned,
                sold: getTeam(8, 'N').sold && !getTeam(8, 'N').owned,
              }"
            >
              <span class="team-name">{{ getTeam(8, "N").name }}</span>
            </div>
            <div
              seed="9"
              class="away"
              :class="{
                owned: getTeam(9, 'N').owned,
                sold: getTeam(9, 'N').sold && !getTeam(9, 'N').owned,
              }"
            >
              <span class="team-name">{{ getTeam(9, "N").name }}</span>
            </div>
          </div>
          <div class="matchup">
            <div
              seed="5"
              class="home"
              :class="{
                owned: getTeam(5, 'N').owned,
                sold: getTeam(5, 'N').sold && !getTeam(5, 'N').owned,
              }"
            >
              <span class="team-name">{{ getTeam(5, "N").name }}</span>
            </div>
            <div
              seed="12"
              class="away"
              :class="{
                owned: getTeam(12, 'N').owned,
                sold: getTeam(12, 'N').sold && !getTeam(12, 'N').owned,
              }"
            >
              <span class="team-name">{{ getTeam(12, "N").name }}</span>
            </div>
          </div>
          <div class="matchup">
            <div
              seed="4"
              class="home"
              :class="{
                owned: getTeam(4, 'N').owned,
                sold: getTeam(4, 'N').sold && !getTeam(4, 'N').owned,
              }"
            >
              <span class="team-name">{{ getTeam(4, "N").name }}</span>
            </div>
            <div
              seed="13"
              class="away"
              :class="{
                owned: getTeam(13, 'N').owned,
                sold: getTeam(13, 'N').sold && !getTeam(13, 'N').owned,
              }"
            >
              <span class="team-name">{{ getTeam(13, "N").name }}</span>
            </div>
          </div>
          <div class="matchup">
            <div
              seed="6"
              class="home"
              :class="{
                owned: getTeam(6, 'N').owned,
                sold: getTeam(6, 'N').sold && !getTeam(6, 'N').owned,
              }"
            >
              <span class="team-name">{{ getTeam(6, "N").name }}</span>
            </div>
            <div
              seed="11"
              class="away"
              :class="{
                owned: getTeam(11, 'N').owned,
                sold: getTeam(11, 'N').sold && !getTeam(11, 'N').owned,
              }"
            >
              <span class="team-name">{{ getTeam(11, "N").name }}</span>
            </div>
          </div>
          <div class="matchup">
            <div
              seed="3"
              class="home"
              :class="{
                owned: getTeam(3, 'N').owned,
                sold: getTeam(3, 'N').sold && !getTeam(3, 'N').owned,
              }"
            >
              <span class="team-name">{{ getTeam(3, "N").name }}</span>
            </div>
            <div
              seed="14"
              class="away"
              :class="{
                owned: getTeam(14, 'N').owned,
                sold: getTeam(14, 'N').sold && !getTeam(14, 'N').owned,
              }"
            >
              <span class="team-name">{{ getTeam(14, "N").name }}</span>
            </div>
          </div>
          <div class="matchup">
            <div
              seed="7"
              class="home"
              :class="{
                owned: getTeam(7, 'N').owned,
                sold: getTeam(7, 'N').sold && !getTeam(7, 'N').owned,
              }"
            >
              <span class="team-name">{{ getTeam(7, "N").name }}</span>
            </div>
            <div
              seed="10"
              class="away"
              :class="{
                owned: getTeam(10, 'N').owned,
                sold: getTeam(10, 'N').sold && !getTeam(10, 'N').owned,
              }"
            >
              <span class="team-name">{{ getTeam(10, "N").name }}</span>
            </div>
          </div>
          <div class="matchup">
            <div
              seed="2"
              class="home"
              :class="{
                owned: getTeam(2, 'N').owned,
                sold: getTeam(2, 'N').sold && !getTeam(2, 'N').owned,
              }"
            >
              <span class="team-name">{{ getTeam(2, "N").name }}</span>
            </div>
            <div
              seed="15"
              class="away"
              :class="{
                owned: getTeam(15, 'N').owned,
                sold: getTeam(15, 'N').sold && !getTeam(15, 'N').owned,
              }"
            >
              <span class="team-name">{{ getTeam(15, "N").name }}</span>
            </div>
          </div>
          <div class="matchup">
            <div
              seed="1"
              class="home"
              :class="{
                owned: getTeam(1, 'W').owned,
                sold: getTeam(1, 'W').sold && !getTeam(1, 'W').owned,
              }"
            >
              <span class="team-name">{{ getTeam(1, "W").name }}</span>
            </div>
            <div
              seed="16"
              class="away"
              :class="{
                owned: getTeam(16, 'W').owned,
                sold: getTeam(16, 'W').sold && !getTeam(16, 'W').owned,
              }"
            >
              <span class="team-name">{{ getTeam(16, "W").name }}</span>
            </div>
          </div>
          <div class="matchup">
            <div
              seed="8"
              class="home"
              :class="{
                owned: getTeam(8, 'W').owned,
                sold: getTeam(8, 'W').sold && !getTeam(8, 'W').owned,
              }"
            >
              <span class="team-name">{{ getTeam(8, "W").name }}</span>
            </div>
            <div
              seed="9"
              class="away"
              :class="{
                owned: getTeam(9, 'W').owned,
                sold: getTeam(9, 'W').sold && !getTeam(9, 'W').owned,
              }"
            >
              <span class="team-name">{{ getTeam(9, "W").name }}</span>
            </div>
          </div>
          <div class="matchup">
            <div
              seed="5"
              class="home"
              :class="{
                owned: getTeam(5, 'W').owned,
                sold: getTeam(5, 'W').sold && !getTeam(5, 'W').owned,
              }"
            >
              <span class="team-name">{{ getTeam(5, "W").name }}</span>
            </div>
            <div
              seed="12"
              class="away"
              :class="{
                owned: getTeam(12, 'W').owned,
                sold: getTeam(12, 'W').sold && !getTeam(12, 'W').owned,
              }"
            >
              <span class="team-name">{{ getTeam(12, "W").name }}</span>
            </div>
          </div>
          <div class="matchup">
            <div
              seed="4"
              class="home"
              :class="{
                owned: getTeam(4, 'W').owned,
                sold: getTeam(4, 'W').sold && !getTeam(4, 'W').owned,
              }"
            >
              <span class="team-name">{{ getTeam(4, "W").name }}</span>
            </div>
            <div
              seed="13"
              class="away"
              :class="{
                owned: getTeam(13, 'W').owned,
                sold: getTeam(13, 'W').sold && !getTeam(13, 'W').owned,
              }"
            >
              <span class="team-name">{{ getTeam(13, "W").name }}</span>
            </div>
          </div>
          <div class="matchup">
            <div
              seed="6"
              class="home"
              :class="{
                owned: getTeam(6, 'W').owned,
                sold: getTeam(6, 'W').sold && !getTeam(6, 'W').owned,
              }"
            >
              <span class="team-name">{{ getTeam(6, "W").name }}</span>
            </div>
            <div
              seed="11"
              class="away"
              :class="{
                owned: getTeam(11, 'W').owned,
                sold: getTeam(11, 'W').sold && !getTeam(11, 'W').owned,
              }"
            >
              <span class="team-name">{{ getTeam(11, "W").name }}</span>
            </div>
          </div>
          <div class="matchup">
            <div
              seed="3"
              class="home"
              :class="{
                owned: getTeam(3, 'W').owned,
                sold: getTeam(3, 'W').sold && !getTeam(3, 'W').owned,
              }"
            >
              <span class="team-name">{{ getTeam(3, "W").name }}</span>
            </div>
            <div
              seed="14"
              class="away"
              :class="{
                owned: getTeam(14, 'W').owned,
                sold: getTeam(14, 'W').sold && !getTeam(14, 'W').owned,
              }"
            >
              <span class="team-name">{{ getTeam(14, "W").name }}</span>
            </div>
          </div>
          <div class="matchup">
            <div
              seed="7"
              class="home"
              :class="{
                owned: getTeam(7, 'W').owned,
                sold: getTeam(7, 'W').sold && !getTeam(7, 'W').owned,
              }"
            >
              <span class="team-name">{{ getTeam(7, "W").name }}</span>
            </div>
            <div
              seed="10"
              class="away"
              :class="{
                owned: getTeam(10, 'W').owned,
                sold: getTeam(10, 'W').sold && !getTeam(10, 'W').owned,
              }"
            >
              <span class="team-name">{{ getTeam(10, "W").name }}</span>
            </div>
          </div>
          <div class="matchup">
            <div
              seed="2"
              class="home"
              :class="{
                owned: getTeam(2, 'W').owned,
                sold: getTeam(2, 'W').sold && !getTeam(2, 'W').owned,
              }"
            >
              <span class="team-name">{{ getTeam(2, "W").name }}</span>
            </div>
            <div
              seed="15"
              class="away"
              :class="{
                owned: getTeam(15, 'W').owned,
                sold: getTeam(15, 'W').sold && !getTeam(15, 'W').owned,
              }"
            >
              <span class="team-name">{{ getTeam(15, "W").name }}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="round round-2">
        <div class="round-header">
          <div class="round-name"><h4>Round of 32</h4></div>
          <div class="round-date"><h4>3/18 - 3/19</h4></div>
        </div>
        <div class="round-matchups">
          <div class="matchup" v-for="count in [...Array(8).keys()]">
            <div seed="?" class="home"><span class="team-name"></span></div>
            <div seed="?" class="away"><span class="team-name"></span></div>
          </div>
        </div>
      </div>
      <div class="round round-3">
        <div class="round-header">
          <div class="round-name"><h4>Sweet 16</h4></div>
          <div class="round-date"><h4>3/23 - 3/24</h4></div>
        </div>
        <div class="round-matchups">
          <div class="matchup" v-for="count in [...Array(4).keys()]">
            <div seed="?" class="home"><span class="team-name"></span></div>
            <div seed="?" class="away"><span class="team-name"></span></div>
          </div>
        </div>
      </div>
      <div class="round round-4">
        <div class="round-header">
          <div class="round-name"><h4>Elite Eight</h4></div>
          <div class="round-date"><h4>3/25 - 3/26</h4></div>
        </div>
        <div class="round-matchups">
          <div class="matchup" v-for="count in [...Array(2).keys()]">
            <div seed="?" class="home"><span class="team-name"></span></div>
            <div seed="?" class="away"><span class="team-name"></span></div>
          </div>
        </div>
      </div>
      <div class="round round-5">
        <div class="round-header">
          <div class="round-name"><h4>Final Four</h4></div>
          <div class="round-date"><h4>4/1</h4></div>
        </div>
        <div class="round-matchups">
          <div class="matchup">
            <div seed="?" class="home"><span class="team-name"></span></div>
            <div seed="?" class="away"><span class="team-name"></span></div>
          </div>
        </div>
      </div>
      <div class="round round-6">
        <div class="round-header">
          <div class="round-name"><h4>Championship</h4></div>
          <div class="round-date"><h4>4/3</h4></div>
        </div>
        <div class="championship-matchup">
          <div class="matchup">
            <div seed="?" class="home"><span class="team-name"></span></div>
            <div seed="?" class="away"><span class="team-name"></span></div>
          </div>
        </div>
      </div>
      <div class="round round-5">
        <div class="round-header">
          <div class="round-name"><h4>Final Four</h4></div>
          <div class="round-date"><h4>4/1</h4></div>
        </div>
        <div class="round-matchups">
          <div class="matchup">
            <div seed="?" class="home"><span class="team-name"></span></div>
            <div seed="?" class="away"><span class="team-name"></span></div>
          </div>
        </div>
      </div>
      <div class="round round-4">
        <div class="round-header">
          <div class="round-name"><h4>Elite Eight</h4></div>
          <div class="round-date"><h4>3/25 - 3/26</h4></div>
        </div>
        <div class="round-matchups">
          <div class="matchup" v-for="count in [...Array(2).keys()]">
            <div seed="?" class="home"><span class="team-name"></span></div>
            <div seed="?" class="away"><span class="team-name"></span></div>
          </div>
        </div>
      </div>
      <div class="round round-3">
        <div class="round-header">
          <div class="round-name"><h4>Sweet 16</h4></div>
          <div class="round-date"><h4>3/23 - 3/24</h4></div>
        </div>
        <div class="round-matchups">
          <div class="matchup" v-for="count in [...Array(4).keys()]">
            <div seed="?" class="home"><span class="team-name"></span></div>
            <div seed="?" class="away"><span class="team-name"></span></div>
          </div>
        </div>
      </div>
      <div class="round round-2">
        <div class="round-header">
          <div class="round-name"><h4>Round of 32</h4></div>
          <div class="round-date"><h4>3/18 - 3/19</h4></div>
        </div>
        <div class="round-matchups">
          <div class="matchup" v-for="count in [...Array(8).keys()]">
            <div seed="?" class="home"><span class="team-name"></span></div>
            <div seed="?" class="away"><span class="team-name"></span></div>
          </div>
        </div>
      </div>
      <div class="round round-1">
        <div class="round-header">
          <div class="round-name"><h4>First Round</h4></div>
          <div class="round-date"><h4>3/16 - 3/17</h4></div>
        </div>
        <div class="round-matchups">
          <div class="matchup">
            <div
              seed="1"
              class="home"
              :class="{
                owned: getTeam(1, 'E').owned,
                sold: getTeam(1, 'E').sold && !getTeam(1, 'E').owned,
              }"
            >
              <span class="team-name">{{ getTeam(1, "E").name }}</span>
            </div>
            <div
              seed="16"
              class="away"
              :class="{
                owned: getTeam(16, 'E').owned,
                sold: getTeam(16, 'E').sold && !getTeam(16, 'E').owned,
              }"
            >
              <span class="team-name">{{ getTeam(16, "E").name }}</span>
            </div>
          </div>
          <div class="matchup">
            <div
              seed="8"
              class="home"
              :class="{
                owned: getTeam(8, 'E').owned,
                sold: getTeam(8, 'E').sold && !getTeam(8, 'E').owned,
              }"
            >
              <span class="team-name">{{ getTeam(8, "E").name }}</span>
            </div>
            <div
              seed="9"
              class="away"
              :class="{
                owned: getTeam(9, 'E').owned,
                sold: getTeam(9, 'E').sold && !getTeam(9, 'E').owned,
              }"
            >
              <span class="team-name">{{ getTeam(9, "E").name }}</span>
            </div>
          </div>
          <div class="matchup">
            <div
              seed="5"
              class="home"
              :class="{
                owned: getTeam(5, 'E').owned,
                sold: getTeam(5, 'E').sold && !getTeam(5, 'E').owned,
              }"
            >
              <span class="team-name">{{ getTeam(5, "E").name }}</span>
            </div>
            <div
              seed="12"
              class="away"
              :class="{
                owned: getTeam(12, 'E').owned,
                sold: getTeam(12, 'E').sold && !getTeam(12, 'E').owned,
              }"
            >
              <span class="team-name">{{ getTeam(12, "E").name }}</span>
            </div>
          </div>
          <div class="matchup">
            <div
              seed="4"
              class="home"
              :class="{
                owned: getTeam(4, 'E').owned,
                sold: getTeam(4, 'E').sold && !getTeam(4, 'E').owned,
              }"
            >
              <span class="team-name">{{ getTeam(4, "E").name }}</span>
            </div>
            <div
              seed="13"
              class="away"
              :class="{
                owned: getTeam(13, 'E').owned,
                sold: getTeam(13, 'E').sold && !getTeam(13, 'E').owned,
              }"
            >
              <span class="team-name">{{ getTeam(13, "E").name }}</span>
            </div>
          </div>
          <div class="matchup">
            <div
              seed="6"
              class="home"
              :class="{
                owned: getTeam(6, 'E').owned,
                sold: getTeam(6, 'E').sold && !getTeam(6, 'E').owned,
              }"
            >
              <span class="team-name">{{ getTeam(6, "E").name }}</span>
            </div>
            <div
              seed="11"
              class="away"
              :class="{
                owned: getTeam(11, 'E').owned,
                sold: getTeam(11, 'E').sold && !getTeam(11, 'E').owned,
              }"
            >
              <span class="team-name">{{ getTeam(11, "E").name }}</span>
            </div>
          </div>
          <div class="matchup">
            <div
              seed="3"
              class="home"
              :class="{
                owned: getTeam(3, 'E').owned,
                sold: getTeam(3, 'E').sold && !getTeam(3, 'E').owned,
              }"
            >
              <span class="team-name">{{ getTeam(3, "E").name }}</span>
            </div>
            <div
              seed="14"
              class="away"
              :class="{
                owned: getTeam(14, 'E').owned,
                sold: getTeam(14, 'E').sold && !getTeam(14, 'E').owned,
              }"
            >
              <span class="team-name">{{ getTeam(14, "E").name }}</span>
            </div>
          </div>
          <div class="matchup">
            <div
              seed="7"
              class="home"
              :class="{
                owned: getTeam(7, 'E').owned,
                sold: getTeam(7, 'E').sold && !getTeam(7, 'E').owned,
              }"
            >
              <span class="team-name">{{ getTeam(7, "E").name }}</span>
            </div>
            <div
              seed="10"
              class="away"
              :class="{
                owned: getTeam(10, 'E').owned,
                sold: getTeam(10, 'E').sold && !getTeam(10, 'E').owned,
              }"
            >
              <span class="team-name">{{ getTeam(10, "E").name }}</span>
            </div>
          </div>
          <div class="matchup">
            <div
              seed="2"
              class="home"
              :class="{
                owned: getTeam(2, 'E').owned,
                sold: getTeam(2, 'E').sold && !getTeam(2, 'E').owned,
              }"
            >
              <span class="team-name">{{ getTeam(2, "E").name }}</span>
            </div>
            <div
              seed="15"
              class="away"
              :class="{
                owned: getTeam(15, 'E').owned,
                sold: getTeam(15, 'E').sold && !getTeam(15, 'E').owned,
              }"
            >
              <span class="team-name">{{ getTeam(15, "E").name }}</span>
            </div>
          </div>
          <div class="matchup">
            <div
              seed="1"
              class="home"
              :class="{
                owned: getTeam(1, 'S').owned,
                sold: getTeam(1, 'S').sold && !getTeam(1, 'S').owned,
              }"
            >
              <span class="team-name">{{ getTeam(1, "S").name }}</span>
            </div>
            <div
              seed="16"
              class="away"
              :class="{
                owned: getTeam(16, 'S').owned,
                sold: getTeam(16, 'S').sold && !getTeam(16, 'S').owned,
              }"
            >
              <span class="team-name">{{ getTeam(16, "S").name }}</span>
            </div>
          </div>
          <div class="matchup">
            <div
              seed="8"
              class="home"
              :class="{
                owned: getTeam(8, 'S').owned,
                sold: getTeam(8, 'S').sold && !getTeam(8, 'S').owned,
              }"
            >
              <span class="team-name">{{ getTeam(8, "S").name }}</span>
            </div>
            <div
              seed="9"
              class="away"
              :class="{
                owned: getTeam(9, 'S').owned,
                sold: getTeam(9, 'S').sold && !getTeam(9, 'S').owned,
              }"
            >
              <span class="team-name">{{ getTeam(9, "S").name }}</span>
            </div>
          </div>
          <div class="matchup">
            <div
              seed="5"
              class="home"
              :class="{
                owned: getTeam(5, 'S').owned,
                sold: getTeam(5, 'S').sold && !getTeam(5, 'S').owned,
              }"
            >
              <span class="team-name">{{ getTeam(5, "S").name }}</span>
            </div>
            <div
              seed="12"
              class="away"
              :class="{
                owned: getTeam(12, 'S').owned,
                sold: getTeam(12, 'S').sold && !getTeam(12, 'S').owned,
              }"
            >
              <span class="team-name">{{ getTeam(12, "S").name }}</span>
            </div>
          </div>
          <div class="matchup">
            <div
              seed="4"
              class="home"
              :class="{
                owned: getTeam(4, 'S').owned,
                sold: getTeam(4, 'S').sold && !getTeam(4, 'S').owned,
              }"
            >
              <span class="team-name">{{ getTeam(4, "S").name }}</span>
            </div>
            <div
              seed="13"
              class="away"
              :class="{
                owned: getTeam(13, 'S').owned,
                sold: getTeam(13, 'S').sold && !getTeam(13, 'S').owned,
              }"
            >
              <span class="team-name">{{ getTeam(13, "S").name }}</span>
            </div>
          </div>
          <div class="matchup">
            <div
              seed="6"
              class="home"
              :class="{
                owned: getTeam(6, 'S').owned,
                sold: getTeam(6, 'S').sold && !getTeam(6, 'S').owned,
              }"
            >
              <span class="team-name">{{ getTeam(6, "S").name }}</span>
            </div>
            <div
              seed="11"
              class="away"
              :class="{
                owned: getTeam(11, 'S').owned,
                sold: getTeam(11, 'S').sold && !getTeam(11, 'S').owned,
              }"
            >
              <span class="team-name">{{ getTeam(11, "S").name }}</span>
            </div>
          </div>
          <div class="matchup">
            <div
              seed="3"
              class="home"
              :class="{
                owned: getTeam(3, 'S').owned,
                sold: getTeam(3, 'S').sold && !getTeam(3, 'S').owned,
              }"
            >
              <span class="team-name">{{ getTeam(3, "S").name }}</span>
            </div>
            <div
              seed="14"
              class="away"
              :class="{
                owned: getTeam(14, 'S').owned,
                sold: getTeam(14, 'S').sold && !getTeam(14, 'S').owned,
              }"
            >
              <span class="team-name">{{ getTeam(14, "S").name }}</span>
            </div>
          </div>
          <div class="matchup">
            <div
              seed="7"
              class="home"
              :class="{
                owned: getTeam(7, 'S').owned,
                sold: getTeam(7, 'S').sold && !getTeam(7, 'S').owned,
              }"
            >
              <span class="team-name">{{ getTeam(7, "S").name }}</span>
            </div>
            <div
              seed="10"
              class="away"
              :class="{
                owned: getTeam(10, 'S').owned,
                sold: getTeam(10, 'S').sold && !getTeam(10, 'S').owned,
              }"
            >
              <span class="team-name">{{ getTeam(10, "S").name }}</span>
            </div>
          </div>
          <div class="matchup">
            <div
              seed="2"
              class="home"
              :class="{
                owned: getTeam(2, 'S').owned,
                sold: getTeam(2, 'S').sold && !getTeam(2, 'S').owned,
              }"
            >
              <span class="team-name">{{ getTeam(2, "S").name }}</span>
            </div>
            <div
              seed="15"
              class="away"
              :class="{
                owned: getTeam(15, 'S').owned,
                sold: getTeam(15, 'S').sold && !getTeam(15, 'S').owned,
              }"
            >
              <span class="team-name">{{ getTeam(15, "S").name }}</span>
            </div>
          </div>
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
.matchup {
  @apply flex flex-col text-xs;
}

.championship-matchup {
  padding-top: 25rem;
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
