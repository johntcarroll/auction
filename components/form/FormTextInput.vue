<script setup>
const props = defineProps({
  name: { type: String, required: true },
  label: { type: String, default: null },
  modelValue: { type: String, required: true },
  placeholder: { type: String, default: "" },
})
const emit = defineEmits(["update:modelValue", "inputBlurred", "inputFocused"])
const text = computed({
  get() {
    return props.modelValue
  },
  set(newText) {
    emit("update:modelValue", newText)
  },
})

const input = ref(null)
const focus = () => {
  input.value.focus()
}

const blur = () => {
  input.value.blur()
}

const searchInputWidth = computed(() => input.value.clientWidth)
const searchInputHeight = computed(() => input.value.clientHeight)
defineExpose({ focus, searchInputWidth, searchInputHeight, blur })
</script>
<template>
  <div clas="flex flex-col w-100">
    <div v-if="label" class="">
      <label :for="name">{{ label }}</label>
    </div>
    <div class="flex-1">
      <input
        class="bg-white dark:bg-slate-500 text-slate-900 dark:text-white rounded dark:focus:border-cyan-300 dark:border-slate-400 w-full placeholder:text-slate-900 dark:placeholder:text-slate-300"
        type="text"
        v-model="text"
        :name="name"
        :placeholder="placeholder"
        ref="input"
        @blur="$emit('inputBlurred')"
        @focus="$emit('inputFocused')"
      />
    </div>
  </div>
</template>
