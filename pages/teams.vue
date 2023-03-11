<script setup>
import currencyFormatter from "~~/helpers/currencyFormatter"
import { sortAndFilter } from "~~/helpers/tableHelpers"
import { useTeamsStore } from "~~/store/teams"
import { storeToRefs } from "pinia"
definePageMeta({
  title: "Teams",
})
const columns = ref([
  {
    display: "name",
    name: "name",
    sort: "asc",
    sortable: true,
  },
  {
    display: "seed",
    name: "seed",
    sort: null,
    sortable: true,
  },
  {
    display: "region",
    name: "region",
    sort: null,
    sortable: true,
  },
  {
    display: "price",
    name: "price",
    sort: null,
    sortable: true,
  },
  {
    display: "available",
    name: "sold",
    sort: null,
    sortable: true,
  },
  {
    display: "owned",
    name: "owned",
    sort: null,
    sortable: true,
  },
])
const sortColumn = computed(() => {
  return columns.value.find((col) => col.sort !== null)?.name || null
})
const sortDirection = computed(() => {
  return columns.value.find((col) => col.sort !== null)?.sort || null
})
const textFilter = ref("")
const handleSortChange = (sortData) => {
  columns.value = columns.value.map((col) => ({
    ...col,
    sort: col.name == sortData.name ? sortData.sort : null,
  }))
}
const teamsStore = useTeamsStore()
const { refresh } = teamsStore
const { teams, error, pending } = storeToRefs(teamsStore)
onMounted(async () => {
  await refresh()
})
const teamRows = computed(() => {
  if (pending.value || error.value) return []
  return sortAndFilter(
    toRaw(teams.value),
    toRaw(sortDirection.value),
    toRaw(sortColumn.value),
    toRaw(textFilter.value)
  )
})
</script>
<template>
  <div>
    <LayoutCard title="teams">
      <template #headerAddon>
        <FormTextInput v-model="textFilter" name="textFilter" />
      </template>
      <template #body>
        <LayoutTable
          :clickable-rows="true"
          :error="error"
          :loading="pending"
          :hover="true"
          :columns="columns"
          @sort-change="handleSortChange"
        >
          <template #rows>
            <tr v-if="teamRows.length == 0">
              <td colspan="7" class="text-center">No Rows to Display</td>
            </tr>
            <tr
              v-else
              v-for="team in teamRows"
              @click="$router.push({ path: `/team/${team.id}` })"
              :key="`${team.id}-row`"
            >
              <td class="title">{{ team.name }}</td>
              <td>{{ team.seed }}</td>
              <td>{{ team.region }}</td>
              <td>
                {{ currencyFormatter.format(team.price) }}
              </td>
              <td v-if="team.sold">
                <i class="fa-solid fa-x text-red-500"></i>
              </td>
              <td v-else><i class="fa-solid fa-check text-green-500"></i></td>
              <td v-if="team.owned">
                <i class="fa-solid fa-check text-green-500"></i>
              </td>
              <td v-else><i class="fa-solid fa-x text-red-500"></i></td>
            </tr>
          </template>
        </LayoutTable>
      </template>
    </LayoutCard>
  </div>
</template>
