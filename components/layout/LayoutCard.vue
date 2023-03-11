<script type="ts" setup>
defineProps({
  title: {type: String, required: false},
  header: {type: Boolean, default: true}
})
defineEmits({})
</script>
<template>
  <div
    class="rounded bg-white dark:bg-slate-800 text-slate-900 dark:text-white border-2 divide-y flex-column"
  >
    <div class="flex p-2 items-center" v-if="header">
      <h6 class="flex-1 px-2 tracking-widest">{{ title }}</h6>
      <div>
        <slot name="headerAddon"></slot>
      </div>
    </div>
    <div class="py-1">
      <slot name="body">Card Content</slot>
    </div>
  </div>
</template>
