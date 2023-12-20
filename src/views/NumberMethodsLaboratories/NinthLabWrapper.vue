<script setup lang="ts">
import BasePage from "@/components/BaseComponents/BasePage.vue";
import AccuracyComponent from "@/components/BaseComponents/AccuracyComponent.vue";
import {ref} from "vue";
import {useToast} from "primevue/usetoast";

const toast = useToast()

interface calculationRecord {
  id: number,
  xBefore: number,
  xAfter: number,
  yBefore: number,
  yAfter: number,
  case: string,
  accuracy: number,
}

//Точность
const localAccuracy = ref<number>(0.1)
//Произвольная точка
const arbitraryPoint = ref<number>(0.25)
//Шаг (приращение аргумента)
const mathematicalStep = ref<number>(0.2)

//Результат вычисления
const finalPoint = ref<number>(0)
//Кол-во итераций
const finalIterationCount = ref<number>(0)

const maxIteration = ref<number>(1000)

const listCalculationRecords = ref<calculationRecord[]>([])

const equationResult = (x: number) => {
  return (Math.pow(x, 3) / 3) + Math.pow(x, 2)
}

const startSolvingProblem = () => {
  listCalculationRecords.value = []
  finalPoint.value = 0
  finalIterationCount.value = 0
  //region Обработка ошибок
  if (!arbitraryPoint.value) {
    toast.add({
      severity: 'error',
      summary: 'Ошибка',
      detail: 'Введите значение произвольной точки',
      life: 3000
    })
    return;
  }
  if (!mathematicalStep.value) {
    toast.add({
      severity: 'error',
      summary: 'Ошибка',
      detail: 'Введите значение приращения аргумента',
      life: 3000
    })
    return;
  }
  if (!maxIteration.value) {
    toast.add({
      severity: 'error',
      summary: 'Ошибка',
      detail: 'Введите максимальное количество итераций',
      life: 3000
    })
    return;
  }
  //endregion

  let x = arbitraryPoint.value
  let epsilon = localAccuracy.value
  let h = mathematicalStep.value

  let d = null
  let x1 = null
  let y = null
  let y1 = null

  let somethingValuePlus = 3
  let k = 0
  x1 = x
  y = equationResult(x)


  let record: calculationRecord = {
    id: 0,
    xBefore: 0,
    xAfter: 0,
    yBefore: 0,
    yAfter: 0,
    case: '',
    accuracy: 0,
  }

  do {
    x1 += h
    y1 = equationResult(x1)
    d = Math.abs(h)

    record.id = k+1
    record.xBefore = x
    record.xAfter = x1
    record.yBefore = y
    record.yAfter = y1
    record.accuracy = d

    if (y1 === y) {
      x = (x + x1) / 2
      record.case = 'y = y1'
    }

    if (y1 < y) {
      x = x1;
      y = y1;
      record.case = 'y > y1'
    }

    if (y1 >= y) {
      if (d >= epsilon) {
        h = -h / somethingValuePlus
      }
      record.case = 'y <= y1'
    }

    x = x1
    y = y1


    listCalculationRecords.value.push(record)
    record = {
      id: 0,
      xBefore: 0,
      xAfter: 0,
      yBefore: 0,
      yAfter: 0,
      case: '',
      accuracy: 0,
    }

    k++
    if (k >= maxIteration.value) {
      toast.add({
        severity: 'error',
        summary: 'Ошибка',
        detail: 'Превышение количества итераций',
        life: 3000
      })
    }
  } while ((k < maxIteration.value) && ((y1 >= y) && (d > epsilon)))

  // x += h * somethingValuePlus
  finalPoint.value = Number(x1.toFixed(16))
  finalIterationCount.value = k
}

</script>

<template>
  <BasePage>
    <template #header>
      Лабораторная работа №9 Поиск минимума функции одной переменной
    </template>
    <template #body>
      <div class="ninth-lab-wrapper" style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
        <div class="left-body" style="display: flex; flex-direction: column; gap: 12px;">
        <div class="equation" style="display: flex; align-items: center; justify-content: flex-start; width: max-content;">
          <div style="display: grid; grid-template-rows: 1fr 1fr; width: max-content;">
            <div style="border-bottom: 1px solid; width: max-content;"><span>x<sup>3</sup></span></div>
            <div style="display: flex; justify-content: center;">3</div>
          </div>
          <div>
            <span> + x <sup>2</sup></span>
          </div>
        </div>
        <div class="accuracy-wrapper">
          <AccuracyComponent @accuracy="localAccuracy = $event"/>
        </div>
        <div class="inputs-wrapper" style="display: flex; flex-direction: column; width: max-content; gap: 12px;">
          <div class="input-item" style="display: flex; justify-content: flex-start; align-items: center; width: max-content;">
            <span>Произвольная точка x0: </span> <InputNumber v-model="arbitraryPoint"/>
          </div>
          <div class="input-item" style="display: flex; justify-content: flex-start; align-items: center; width: max-content;">
            <span>Произвольное приращение аргумента x: </span> <InputNumber v-model="mathematicalStep"/>
          </div>
          <div class="input-item" style="display: flex; justify-content: flex-start; align-items: center; width: max-content;">
            <span>Максимальное количество итераций: </span> <InputNumber v-model="maxIteration"/>
          </div>
          <div style="width: max-content">
            <Button label="Вычислить минимум функции" @click="startSolvingProblem"/>
          </div>
        </div>

        <div class="result" style="display: flex; flex-direction: column; width: max-content; gap: 12px;">
          <div class="input-item" style="display: flex; justify-content: flex-start; align-items: center; width: max-content;">
            <span>Результат вычислений: </span> <InputNumber :max-fraction-digits="16" v-model="finalPoint" disabled/>
          </div>
          <div class="input-item" style="display: flex; justify-content: flex-start; align-items: center; width: max-content;">
            <span>Количество итераций: </span> <InputNumber v-model="finalIterationCount" disabled/>
          </div>
        </div>
        </div>
        <div class="records-wrapper">
          <Accordion style="padding-top: 20px;">
            <AccordionTab header="Итерации подробно">
              <div style="display: flex; flex-direction: column; overflow-y: scroll; max-height: 300px;">
            <span
                style="padding: 5px;"
                v-for="iteration in listCalculationRecords"
                :key="iteration.id"
            >
              <div class="iteration" style="display: grid; grid-template-rows: max-content max-content">
                <div>
                  <b>Итерация №{{ iteration.id }}</b>
                </div>
                <div style="display: flex; flex-direction: column">
                  <span>x0 = {{iteration.xBefore}}</span>
                  <span>x1 = {{iteration.xAfter}}</span>
                  <span>y0  = {{iteration.yBefore}}</span>
                  <span>y1  = {{iteration.yAfter}}</span>
                  <span>Погрешность = {{iteration.accuracy}}</span>
                  <span>Ситуация: {{iteration.case}}</span>
                </div>
              </div>
            </span>
              </div>
              <div v-if="listCalculationRecords.length === 0">
                Список итераций пуст
              </div>
            </AccordionTab>
          </Accordion>
        </div>
      </div>
    </template>
    <template #footer>
      Лабораторная выполнена студентом группы 1225и Скрипченко С.Д.
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