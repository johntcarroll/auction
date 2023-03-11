<script setup>
defineProps({
  clickableRows: { type: Boolean, default: false },
  hover: { type: Boolean, default: false },
  loading: { type: Boolean, default: false },
  error: { type: Boolean, default: false },
  errorMessage: {
    type: String,
    default: "There was an error loading this tables data.",
  },
  columns: { type: Array, required: true },
})
const emit = defineEmits(["sortChange"])
const handleSortClick = (column) => {
  if (!column.sortable) return
  emit("sortChange", {
    name: column.name,
    sort: column.sort === null ? "asc" : column.sort === "asc" ? "desc" : null,
  })
}
</script>
<template>
  <div>
    <table
      class="table"
      :class="{ 'table-hover': hover, 'table-nav-rows': clickableRows }"
    >
      <thead>
        <tr>
          <th
            v-for="column in columns"
            :class="{ 'cursor-pointer': column.sortable }"
            @click="handleSortClick(column)"
          >
            {{ column.display }}
            <i
              v-if="column.sortable"
              class="fa-solid"
              :class="{
                'fa-sort': column.sort === null,
                'fa-sort-down': column.sort === 'asc',
                'fa-sort-up': column.sort == 'desc',
              }"
            ></i>
          </th>
        </tr>
      </thead>
      <tbody v-if="loading">
        <tr>
          <td class="text-center" :colspan="columns.length">Loading...</td>
        </tr>
      </tbody>
      <tbody v-else-if="error">
        <td class="text-center" :colspan="column.length">
          {{ errorMessage }}
        </td>
      </tbody>
      <tbody v-else>
        <slot name="rows"></slot>
      </tbody>
    </table>
  </div>
</template>
