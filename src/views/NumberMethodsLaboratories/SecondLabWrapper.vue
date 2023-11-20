<script setup lang="ts">
import BasePage from "@/components/BaseComponents/BasePage.vue";
import {computed, ref, watch} from "vue";

const powerAccuracy = ref<number>(-1)

const computAccuracy = computed((): number => {
  return 1 / Math.pow(10, Math.abs(powerAccuracy.value))
})

const aVariable = ref<number>(-10)
const bVariable = ref<number>(10)
const cVariable = ref<number>(0)

function equation(x: number) {
  // Задаем уравнение: x^3 + 3x + 5
  return (Math.pow(x, 3) + 3 * x + 5)
}

function findRootUsingBisection(accuracy: number) {
  let localVariableA = aVariable.value // Левая граница интервала
  let localVariableB = bVariable.value // Правая граница интервала

  let fromFunctionA = equation(localVariableA);
  let fromFunctionB = equation(localVariableB);
  let fromFunctionC = equation((fromFunctionA + fromFunctionB) / 2)

  if (fromFunctionC === 0) {
    // Если f(c) = 0, то не имеет решения.
    return undefined
  }

  if (fromFunctionA * fromFunctionB >= 0) {
    // Если f(a) и f(b) имеют одинаковые знаки, то не имеет решения.
    return undefined
  }

  while ((localVariableB - localVariableA) / 2 > accuracy) {
    let center = (localVariableA + localVariableB) / 2
    let fromFunctionCenter = equation(center)

    if (fromFunctionCenter === 0) {
      return center; // Корень найден, если
    } else if (fromFunctionA * fromFunctionCenter < 0) {
      localVariableB = center // Корень находится в левой половине
      fromFunctionB = fromFunctionCenter; // Обновляем значение fromFunctionB
    } else {
      localVariableA = center // Корень находится в правой половине
      fromFunctionA = fromFunctionCenter; // Обновляем значение fromFunctionA
    }
  }
  // Возвращаем середину интервала как приближенное значение корня
  return (localVariableA + localVariableB) / 2
}
// корень
const root = computed(() => {
  return findRootUsingBisection(computAccuracy.value)
})


watch(powerAccuracy, (value) => {
  if (value >= 0) {
    powerAccuracy.value = -1
  }
})
</script>

<template>
  <BasePage>
    <template #header>
      Лабораторная работа №2
      Численное решение нелинейных уравнений.
      Метод половинного деления.
    </template>
    <template #body>
      <div class="second-lab-wrapper">
        <div style="padding-bottom: 15px;">
          <span>
            Уравнение: x<sup>3</sup> + 3x + 5=0
          </span>
        </div>
        <div class="second-lab-controls">
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
          <div class="a-b-numbers">
            <div style="display: flex; gap: 10px; justify-content: flex-start; align-items: center;">
              <span>Значение "а" (левое значение интервала) = </span>
              <InputNumber v-model="aVariable"/>
            </div>
            <div style="display: flex; gap: 10px; justify-content: flex-start; align-items: center;">
              <span>Значение "b" (правое значение интервала) = </span>
              <InputNumber v-model="bVariable"/>
            </div>
            <div>
              <span>
                Значение "c" = {{ cVariable }}
              </span>
            </div>
            <div v-if="root">
              Ответ: x = {{root.toFixed(7)}}
            </div>
            <div v-else>
              {{ root }}
              Решение: не имеет решения при заданных условиях
            </div>
          </div>
        </div>
        <div class="functional-block">

        </div>
      </div>
    </template>
    <template #footer>
      <div>
        Лабораторная выполнена студентом группы 1225и Скрипченко С.Д.
      </div>
    </template>
  </BasePage>
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

.a-b-numbers
  display: flex
  flex-direction: column
  gap: 10px
@media (prefers-color-scheme: light)
  :deep(.p-inputtext.p-component.p-inputnumber-input)
    background-color: white
    color: black
  :deep(.p-accordion.p-component)
    background-color: white
    color: black
  :deep(.p-accordion .p-accordion-tab:last-child .p-accordion-header:not(.p-highlight) .p-accordion-header-link)
    background-color: white
    color: black
  :deep(.p-accordion .p-accordion-header:not(.p-disabled).p-highlight:hover .p-accordion-header-link)
    background-color: white
    color: black
  :deep(.p-accordion .p-accordion-tab:last-child .p-accordion-content)
    background-color: white
    color: black
  :deep(.p-accordion .p-accordion-tab:first-child .p-accordion-header .p-accordion-header-link)
    background-color: white
    color: black
</style>