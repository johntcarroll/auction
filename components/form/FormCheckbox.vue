<script setup>
const props = defineProps({
  name: { type: String, required: true },
  label: { type: String, default: null },
  modelValue: { default: false },
  disabled: { type: Boolean, default: false },
})
const emit = defineEmits(["update:modelValue"])
const checked = computed({
  get() {
    return props.modelValue
  },
  set(newChecked) {
    emit("update:modelValue", newChecked)
  },
})

const input = ref(null)
const focus = () => {
  input.value.focus()
}
defineExpose({ focus })
</script>
<template>
  <div clas="flex flex-col w-100 justify-items-center items-center">
    <div v-if="label" class="">
      <label :for="name" class="uppercase tracking-wide">{{ label }}</label>
    </div>
    <input
      class=""
      type="checkbox"
      v-model="checked"
      :name="name"
      ref="input"
      :disabled="disabled"
    />
  </div>
</template>
