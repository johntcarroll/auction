<script setup>
const props = defineProps({
  name: { type: String, required: true },
  label: { type: String, default: null },
  modelValue: { default: 0 },
  placeholder: { type: String, default: "" },
  disabled: { type: Boolean, default: false },
})
const emit = defineEmits(["update:modelValue"])
const num = computed({
  get() {
    return props.modelValue
  },
  set(newNum) {
    emit("update:modelValue", newNum)
  },
})

const input = ref(null)
const focus = () => {
  input.value.focus()
}
defineExpose({ focus })
</script>
<template>
  <div clas="flex flex-col w-100">
    <div v-if="label" class="">
      <label :for="name">{{ label }}</label>
    </div>
    <div class="flex-1">
      <input
        class="bg-white dark:bg-slate-500 text-slate-900 dark:text-white rounded dark:focus:border-cyan-300 dark:border-slate-400 w-full placeholder:text-slate-900 dark:placeholder:text-slate-300"
        type="number"
        v-model="num"
        :name="name"
        :placeholder="placeholder"
        ref="input"
        :disabled="disabled"
      />
    </div>
  </div>
</template>
