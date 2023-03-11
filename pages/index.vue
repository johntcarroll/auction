<script lang="tsx" setup>
const route = useRoute();
if (route.name == "index")
  navigateTo({
    path: "/bracket",
  });
</script>
<template>
  <div>
    <h1>Home</h1>
  </div>
</template>
