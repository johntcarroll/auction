<script setup>
defineProps({
  stat: { type: Number, required: true },
  rank: { type: Number, default: null },
  name: {
    type: String,
    required: true,
  },
})
</script>
<template>
  <div class="stat-box">
    <div class="stat-value" :rank="rank">
      {{ stat }}
    </div>
    <div class="stat-title">{{ name }}</div>
  </div>
</template>
<style scoped>
.stat-box {
  @apply flex flex-col;
}

.stat-value {
  @apply text-2xl text-center tracking-widest after:content-[attr(rank)];
}

.stat-value::after {
  @apply text-sm italic pl-2;
}

.stat-rank {
  @apply text-sm italic;
}

.stat-title {
  @apply text-center uppercase tracking-wide;
}
</style>
