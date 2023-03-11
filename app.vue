<script setup lang="ts">
useHead({
  title: "March Madness Auction",
  script: [
    {
      // import font awesome kit
      src: "https://kit.fontawesome.com/40fbf1a2bb.js",
      type: "text/javascript",
      async: true,
    },
  ],
})

// compute height of main display so it is scrollable
const header: Ref<HTMLElement | null> = ref(null)
const pageHeight = computed(() => {
  if (header.value) {
    return window.innerHeight - header.value.clientHeight + "px"
  }
})
</script>
<template>
  <div
    class="bg-white dark:bg-slate-800 w-full h-screen max-h-screen"
    :class="$colorMode.value"
  >
    <div
      class="bg-white dark:bg-slate-800 text-slate-900 dark:text-white container mx-auto flex h-screen max-h-screen"
    >
      <div class="flex">
        <NavSidebar />
      </div>
      <div class="flex-1 flex-column">
        <div ref="header">
          <NavHeader />
        </div>
        <div class="overflow-y-scroll" :style="{ height: pageHeight }">
          <NuxtPage />
        </div>
      </div>
    </div>
  </div>
</template>
