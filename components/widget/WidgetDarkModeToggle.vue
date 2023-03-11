<script type="ts" setup>
const colorMode = useColorMode()
const handleToggle = () => colorMode.preference = colorMode.preference == "dark" ? "light" : "dark"
</script>
<template>
  <div>
    <input
      type="checkbox"
      class="checkbox"
      v-model="$colorMode.preference"
      true-value="dark"
      false-value="light"
    />
    <label
      for="checkbox"
      class="checkbox-label bg-slate-500"
      @click="handleToggle"
    >
      <i class="fa-solid fa-sun text-yellow-500"></i>
      <i class="fa-solid fa-moon text-slate-900"></i>
      <span class="ball"></span>
    </label>
  </div>
</template>
<style scoped>
.checkbox {
  opacity: 0;
  position: absolute;
}

.checkbox-label {
  width: 50px;
  height: 26px;
  border-radius: 50px;
  position: relative;
  padding: 5px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.checkbox-label .ball {
  background-color: #fff;
  width: 22px;
  height: 22px;
  position: absolute;
  left: 2px;
  top: 2px;
  border-radius: 50%;
  transition: transform 0.2s linear;
}

.checkbox:checked + .checkbox-label .ball {
  transform: translateX(24px);
}
</style>
