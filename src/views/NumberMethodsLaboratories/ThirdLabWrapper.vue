<script setup lang="ts">


import BasePage from "@/components/BaseComponents/BasePage.vue";
import AccuracyComponent from "@/components/BaseComponents/AccuracyComponent.vue";
import {computed, ref, watch} from "vue";
import {useToast} from "primevue/usetoast";

const toast = useToast()

const localAccuracy = ref<number>(0.1)
const aVariable = ref<number>(-10)
const bVariable = ref<number>(10)
const startVariable = ref<number>(-10)
const result = ref<number>(0)
const resultFx = ref<number>(0)
const iteration = ref<number>(0)
const maxIteration = ref<number>(100)

interface IIterationItem {
  id: number,
  description: string,
}

const iterationList = ref<IIterationItem[]>([])

function equation(x: number) {
  // Задаем уравнение: x^3 + 3x + 5
  return (Math.pow(x, 3) + 3 * x + 5)
}

function powerEquation(x: number) {
  return (3 * Math.pow(x, 2) + 3)
}


const getResult = () => {
  iterationList.value = []
  let xIteration = aVariable.value; // Начальное приближение
  const lambda = 1 / Math.max(powerEquation(aVariable.value), powerEquation(bVariable.value)) // Значение λ
  let deltaX = 0 // Переменная для хранения изменения x
  if (equation(aVariable.value) * equation(bVariable.value) > 0) {
    toast.add({
      severity: 'error',
      summary: 'Ошибка',
      detail: 'На данном интервале нет корней',
      life: 3000
    })
    result.value = 0
    resultFx.value = 0
    iterationList.value = []
    return;
  }
// Итерации
  for (iteration.value = 1; iteration.value <= maxIteration.value; iteration.value++) {
    const nextX = xIteration - lambda * equation(xIteration);
    deltaX = Math.abs(nextX - xIteration);
    if (deltaX < localAccuracy.value) {
      toast.add({
        severity: 'success',
        summary: 'Успех!',
        detail: 'Решение найдено',
        life: 3000
      })
      result.value = xIteration
      resultFx.value = equation(xIteration)
      break;
    }
    xIteration = nextX;
    iterationList.value.push({
      id: iteration.value,
      description: `Итерация ${iteration.value}: x = ${xIteration.toFixed(fixedResult.value)}, Δx = ${deltaX.toFixed(fixedResult.value)}, F(x) = ${equation(xIteration).toFixed(fixedResult.value)}`
    })
  }
  if (deltaX >= localAccuracy.value) {
    toast.add({
      severity: 'error',
      summary: 'Ошибка',
      detail: `Не удалось найти решение с заданной точностью (${localAccuracy.value})`,
      life: 3000
    })
    toast.add({
      severity: 'warn',
      summary: 'Предупреждение',
      detail: 'В качестве решения установлено последнее найденное значение',
      life: 3000
    })
    result.value = xIteration
    resultFx.value = equation(xIteration)
  }
}

const fixedResult = computed(() => {
  if (maxIteration.value < 100) {
    return 5
  } else if (maxIteration.value >= 100 && maxIteration.value < 1000) {
    return 10
  } else if (maxIteration.value >= 1000) {
    return 15
  } else {
    return 35
  }
})
//@ts-ignore
watch(startVariable, (value, oldValue) => {
  if (startVariable.value < aVariable.value
      || startVariable.value > bVariable.value) {
    toast.add({
      severity: 'error',
      summary: 'Ошибка',
      detail: 'Стартовое значение должно попадать в указанный диапазон',
      life: 3000
    })
    startVariable.value = oldValue
  }
})

</script>

<template>
  <BasePage>
    <template #header>
      Лабораторная работа №3
      Численное решение нелинейных уравнений.
      Метод итераций.
    </template>
    <template #body>
      <div class="controls">
        <div style="padding-bottom: 15px;">
          <span>
            Уравнение: x<sup>3</sup> + 3x + 5=0
          </span>
        </div>
        <AccuracyComponent @accuracy="localAccuracy = $event"/>
        <div style="display: flex; gap: 10px;justify-content: flex-start; align-items: center">
          <span>
            Максимальное количество итераций =
          </span>
          <InputNumber v-model="maxIteration"/>
        </div>
        <div style="display: flex; gap: 10px;justify-content: flex-start; align-items: center">
          <span>
            Значение "а" (левое значение интервала) =
          </span>
          <InputNumber v-model="aVariable"/>
        </div>
        <div style="display: flex; gap: 10px;justify-content: flex-start; align-items: center">
          <span>
            Значение "b" (левое значение интервала) =
          </span>
          <InputNumber v-model="bVariable"/>
        </div>
        <div style="display: flex; gap: 10px;justify-content: flex-start; align-items: center">
          <span>
            Начальное значение "x" =
          </span>
          <InputNumber v-model="startVariable"/>
        </div>
      </div>
      <div>
        <span>
          Ответ: x = {{ result.toFixed(fixedResult) }}, F(x) = {{ resultFx.toFixed(fixedResult) }}
        </span>
      </div>
      <div style="padding-top: 20px;">
        <Button label="Начать решение" @click="getResult"/>
      </div>
      <Accordion style="padding-top: 20px;">
        <AccordionTab header="Итерации">
          <div style="display: flex; flex-direction: column; overflow-y: scroll; max-height: 300px;">
            <span
                style="padding: 5px;"
                v-for="iteration in iterationList.slice(-1000)"
                :key="iteration.id"
            >
              {{ iteration.id }}) {{ iteration.description }}
            </span>
          </div>
          <div v-if="iterationList.length === 0">
            Список итераций пуст
          </div>
        </AccordionTab>
      </Accordion>
    </template>
    <template #footer>
      <div>
        Лабораторная выполнена студентом группы 1225и Скрипченко С.Д.
      </div>
    </template>
  </BasePage>
</template>

<style scoped lang="sass">
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
