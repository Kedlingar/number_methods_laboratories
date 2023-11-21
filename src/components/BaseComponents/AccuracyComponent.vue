<script setup lang="ts">
import {computed, ref, watch} from "vue";

const emit = defineEmits(['accuracy'])

const powerAccuracy = ref<number>(-1)

const computAccuracy = computed((): number => {
  return 1 / Math.pow(10, Math.abs(powerAccuracy.value))
})


watch(powerAccuracy, (value) => {
  if (value >= 0) {
    powerAccuracy.value = -1
  }
})

watch(powerAccuracy, () => {
  emit('accuracy', computAccuracy.value)
})
</script>

<template>
  <div style="display: grid; grid-template-columns: max-content 40px max-content; position: relative">
    <div>
      Точность вычисления:
    </div>
    <div class="accuracy-wrapper">
      <div class="number">
        10
      </div>
      <div class="power">
        <div>
          <input type="number" v-model="powerAccuracy" pattern="-\d+(\.\d+)?"/>
        </div>
      </div>
    </div>
    <div>
      = {{ computAccuracy }}
    </div>
  </div>
</template>

<style scoped lang="sass">
.accuracy-wrapper
  padding-bottom: 10px
  position: relative

  & > .number
    position: relative

  & > .power
    position: absolute
    top: -15px
    left: 15px

    & > div > input
      width: 50px
      background: transparent
      border: 1px solid rgba(0, 0, 0, 0)

      &:hover
        border: 1px solid rgba(145, 145, 145, 0.2)
        
@media (prefers-color-scheme: light)
  input
    color: black
</style>
