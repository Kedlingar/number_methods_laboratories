<script setup lang="ts">
import BasePage from "@/components/BaseComponents/BasePage.vue";
import {onMounted, ref, watch} from "vue";
import MatrixMain from "@/components/BaseComponents/Matrix/MatrixMain.vue";
import {useNumberMethodsFirstLab} from "@/stores/NumberMethodsLaboratories/FirstLab/firstLabStore.ts";
import {storeToRefs} from "pinia";

const rowCount = ref<number>(3)

const firstLabStore = useNumberMethodsFirstLab()
const {solutions} = storeToRefs(firstLabStore)


const handleStart = () => {
  firstLabStore.setStepMatrix()
  firstLabStore.backSubstitution()
}
const handleResetMatrix = () => {
  firstLabStore.resetMatrixAndSolutions(rowCount.value, rowCount.value)
}

const handleSetRandomValues = () => {
  firstLabStore.setRandomValues()
}

watch(rowCount, () => {
  firstLabStore.resetMatrixAndSolutions(rowCount.value, rowCount.value)
})

onMounted(() => {
  firstLabStore.resetMatrixAndSolutions(rowCount.value, rowCount.value)
})
</script>

<template>
  <BasePage>
    <template #header>
      Лабораторная работа №1 Методы численного
      решения систем линейных алгебраических уравнений. Метод Гаусса.
    </template>
    <template #body>
      <div class="first-lab-body-wrapper">
        <div class="first-lab-body-controls">
          <span class="p-float-label count-rows">
            <InputNumber id="number-input-count-rows" v-model="rowCount"/>
            <label for="number-input-count-rows">Размер матрицы</label>
          </span>
        </div>
        <div class="start-process">
          <Button label="Начать решение" @click="handleStart"/>
          <Button label="Сбросить матрицу" @click="handleResetMatrix"/>
          <Button label="Заполнить случайными значениями" @click="handleSetRandomValues"/>
        </div>
        <div class="first-lab-body-matrix">
          <MatrixMain
              :row-count="rowCount"
              :column-count="rowCount-1"
          />
        </div>
        <div v-if="solutions.length > 0" class="answers-wrapper">
          Ответ:
          <div class="answer">
            <div v-for="(solution, i) in solutions">
              {{i+1}}) {{isNaN(solution) ? "Ошибка вычисления - NaN" : solution.toFixed()}}
            </div>
          </div>
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
.first-lab-body-wrapper
  display: grid
  grid-template-rows: max-content 1fr
  gap: 10px
  & > .first-lab-body-controls
    display: flex
    flex-wrap: wrap
    gap: 10px
  & > .start-process
    display: flex
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