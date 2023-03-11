<script type="ts" setup>
const links = [
  {
    display: "bracket",
    to: "/bracket"
  },
  {
    display: "teams",
    to: "/teams"
  },
]
</script>
<template>
  <div class="flex flex-col gap-4 justify-items-center flex-nowrap mr-2">
    <img src="~/assets/images/mm-logo.png" class="max-w-xs p-2" />
    <div class="flex flex-col divide-y">
      <NuxtLink
        v-for="link in links"
        class="p-4 hover:bg-slate-100 dark:hover:bg-slate-600"
        :to="link.to"
      >
        <h2>{{ link.display }}</h2>
      </NuxtLink>
    </div>
  </div>
</template>
