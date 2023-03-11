<script setup>
import { storeToRefs } from "pinia"
import currencyFormatter from "~~/helpers/currencyFormatter"
import { useTeamsStore } from "~~/store/teams"
const router = useRouter()

const { teamsRemaining, totalPot, estimatedPot, teams, dollarsSpent } =
  storeToRefs(useTeamsStore())
const searchInput = ref(null)
const search = ref("")
const searchDropdownVisible = ref(false)

const shortcutListener = (e) => {
  if (e.key === "k" && (e.ctrlKey || e.metaKey)) {
    e.preventDefault()
    searchInput.value.focus()
  } else if (e.key === "Enter") {
    e.preventDefault()
    console.log("enter")
    let path = document.activeElement.getAttribute("path")
    if (path) router.push({ path })
    search.value = ""
    searchInput.value.blur()
  } else if (e.key === "Escape") {
    e.preventDefault()
    search.value = ""
    searchInput.value.blur()
  }
}

onMounted(() => {
  document.addEventListener("keydown", shortcutListener)
})
onBeforeUnmount(() => {
  document.removeEventListener("keydown", shortcutListener)
})

const toggleSearchDropdown = (visible) => {
  searchDropdownVisible.value = visible
}

const searchInputWidth = computed(() => searchInput?.value?.searchInputWidth)
const searchInputHeight = computed(() => searchInput?.value?.searchInputHeight)
const searchResults = computed(() => {
  if (search.value.length == 0) return []
  if (search.value.at(0) == ":") {
    return [
      { name: "to bracket", path: "/bracket" },
      { name: "to teams", path: "/teams" },
    ].filter((page) =>
      page.name.toLowerCase().includes(search.value.substring(1).toLowerCase())
    )
  } else {
    return (teams.value || [])
      .map((team) => ({ ...team, path: `/team/${team.id}` }))
      .filter(
        (team) =>
          team.name.toLowerCase().includes(search.value.toLowerCase()) ||
          team.conference.toLowerCase().includes(search.value.toLowerCase()) ||
          team.region.toLowerCase().includes(search.value.toLowerCase())
      )
      .sort((a, b) => (a.kenpomRank > b.kenpomRank ? 1 : -1))
  }
})
</script>
<template>
  <div class="flex-1 flex flex-col">
    <div class="flex flex-row justify-around text-center pt-4">
      <div class="flex flex-col">
        <div class="stat-value">
          {{ teamsRemaining }}
        </div>
        <h6>Teams Remaining</h6>
      </div>
      <div class="flex flex-col">
        <div class="stat-value">
          {{ currencyFormatter.format(dollarsSpent) }}
        </div>
        <h6>Spent</h6>
      </div>
      <div class="flex flex-col">
        <div class="stat-value">
          {{ currencyFormatter.format(totalPot) }}
        </div>
        <h6>Current Pot</h6>
      </div>
      <div class="flex flex-col">
        <div class="stat-value">
          {{ currencyFormatter.format(estimatedPot) }}
        </div>
        <h6>Estimated Pot</h6>
      </div>
    </div>
    <div
      class="flex flex-row gap-2 pb-12 pt-6 px-4 content-center justify-items-center items-center flex-nowrap"
    >
      <div class="flex-1 flex flex-col relative">
        <FormTextInput
          ref="searchInput"
          name="search"
          v-model="search"
          placeholder="command + k to focus"
          @input-blurred="toggleSearchDropdown(false)"
          @input-focused="toggleSearchDropdown(true)"
        />
        <div
          class="absolute flex flex-col z-50 bg-white dark:bg-slate-500 text-slate-900 dark:text-white rounded-bl rounded-br dark:border-cyan-300 border-l-2 border-r-2 border-[#2563eb] !bg-opacity-90 border-t-0"
          :class="{
            'border-b-0': !searchDropdownVisible,
            'border-b-2': searchDropdownVisible && search.length > 0,
          }"
          :style="{
            width: searchInputWidth + 2 + 'px',
            top: searchInputHeight - 1 + 'px',
          }"
        >
          <div
            v-for="result in searchResults"
            class="flex flex-row text-sm italic py-2 px-8"
            tabindex="0"
            :path="result.path"
            is-nav-item="true"
          >
            <div class="basis-1/5 uppercase text-xl not-italic">
              {{ result.name }}
            </div>
            <div class="basis-1/5">{{ result.conference }}</div>
            <div class="basis-1/5">{{ result.record }}</div>
            <div
              class="basis-1/5"
              v-if="result?.sold !== null && result?.sold !== undefined"
            >
              Available:
              <i
                class="fa-solid"
                :class="{
                  'fa-circle-check': !result.sold,
                  'text-green-500': !result.sold,
                  'fa-circle-xmark': result.sold,
                  'text-red-500': result.sold,
                }"
              ></i>
            </div>
            <div
              class="basis-1/5"
              v-if="result?.owned !== null && result?.owned !== undefined"
            >
              Owned:
              <i
                class="fa-solid"
                :class="{
                  'fa-sack-dollar': result.owned,
                  'text-green-500': result.owned,
                  'fa-sack-xmark': !result.owned,
                  'text-red-500': !result.owned,
                }"
              ></i>
            </div>
          </div>
        </div>
      </div>
      <WidgetDarkModeToggle />
    </div>
  </div>
</template>
<style scoped>
.stat-value {
  @apply flex-1 text-2xl tracking-wide;
}
</style>
