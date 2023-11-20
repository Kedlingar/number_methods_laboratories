<script setup lang="ts">
import BasePage from "@/components/BaseComponents/BasePage.vue";
import {ref} from "vue";
import AccuracyComponent from "@/components/BaseComponents/AccuracyComponent.vue";
import {useToast} from "primevue/usetoast";

const toast = useToast()

const localAccuracy = ref<number>(0.1)
const variableXOne = ref<number>(2)
const variableXTwo = ref<number>(4)
const iteration = ref<number>(0)
const maxIteration = ref<number>(5)

interface IAnswer {
  firstValue: number,
  secondValue: number
  d: string,
}

const answer = ref<IAnswer>()


/**
 * Первая точка пересечения (стартовая - 1)
 */
const intersectionX1 = 1.3865
const intersectionY1 = 0.9223
/**
 * Вторая точка пересечения (стартовая - 2)
 */
const intersectionX2 = 0.4258
const intersectionY2 = -0.8187


function partialDerivativeX1(f: Function, x1: number, x2: number) {
  const f1 = f(x1 + localAccuracy.value, x2);
  const f2 = f(x1 - localAccuracy.value, x2);
  return (f1 - f2) / (2 * localAccuracy.value);
}

function partialDerivativeX2(f: Function, x1: number, x2: number) {
  const f1 = f(x1, x2 + localAccuracy.value);
  const f2 = f(x1, x2 - localAccuracy.value);
  return (f1 - f2) / (2 * localAccuracy.value);
}

function equationFirst(x1: number, x2: number): number {
  return x2 - Math.sqrt(x1 + 1)
}

function equationSecond(x1: number, x2: number): number {
  return Math.pow(x1, 2) + Math.pow(x2, 2) - 2 * x2
}

function findAnswer() {
  answer.value = undefined
  const maxIterations = maxIteration.value; // Максимальное количество итераций
  let x1 = variableXOne.value // Начальное приближение для x1
  let x2 = variableXTwo.value // Начальное приближение для x2

  for (iteration.value = 0; iteration.value < maxIterations; iteration.value++) {
    const F1 = equationFirst(x1, x2);
    const F2 = equationSecond(x1, x2);

    // Вычисление матрицы Якоби
    const J11 = partialDerivativeX1(equationFirst, x1, x2)
    const J12 = partialDerivativeX2(equationFirst, x1, x2)
    const J21 = partialDerivativeX1(equationSecond, x1, x2)
    const J22 = partialDerivativeX2(equationSecond, x1, x2)

    // Вычисление обратной матрицы Якоби
    const detJ = J11 * J22 - J12 * J21
    const JInverse11 = J22 / detJ
    const JInverse12 = -J12 / detJ
    const JInverse21 = -J21 / detJ
    const JInverse22 = J11 / detJ

    // Вычисление нового приближения
    const deltaX1 = JInverse11 * F1 + JInverse12 * F2;
    const deltaX2 = JInverse21 * F1 + JInverse22 * F2;

    x1 -= deltaX1;
    x2 -= deltaX2;


    // Проверка на сходимость
    if (Math.max(Math.abs(deltaX1), Math.abs(deltaX2)) < localAccuracy.value) {
      toast.add({
        severity: 'success',
        summary: 'Успех',
        detail: 'Решение найдено',
        life: 3000
      })
      answer.value = {
        firstValue: Number(x1.toFixed(10)),
        secondValue: Number(x2.toFixed(10)),
        d: `${deltaX1.toFixed(25)},
        ${deltaX2.toFixed(25)}`,
      }
      break;
    }

    if (iteration.value >= maxIterations) {
      toast.add({
        severity: 'error',
        summary: 'Ошибка',
        detail: 'Не удалось найти решение в заданное количество итераций',
        life: 3000
      })
      break;
    }
  }
  if (!answer.value) {
    toast.add({
      severity: 'error',
      summary: 'Ошибка',
      detail: 'Для вычисления не хватает итераций. Попробуйте поменять настройки',
      life: 3000
    })
  }
}
</script>

<template>
  <BasePage>
    <template #header>
      Лабораторная работа №4.
      Решение системы двух нелинейных уравнений.
      Метод итераций.
    </template>
    <template #body>
      <div class="fourth-lab-wrapper">
        <div>
          Система уравнений:
        </div>
        <div class="equation">
          <div class="brackets">
            <span>
              &#9127;
            </span>
            <span>
            &#9128;
            </span>
            <span>
              &#9129;
            </span>
          </div>
          f<sub>1</sub>(x<sub>1</sub>, x<sub>2</sub>) = x<sub>2</sub> - <span>&#8730;x<sub>1</sub>+1</span> = 0<br/>
          <div style="display: flex;">
            <div>
              f<sub>2</sub>(x<sub>1</sub>, x<sub>2</sub>) =
            </div>
            <div style="
          display: grid;
          grid-template-columns: 10px 10px;
          padding-bottom: 10px;">
              <div>x</div>
              <div style="display: grid; grid-template-rows: 5px 5px;">
                <div>
                  <sup>2</sup>
                </div>
                <div>
                  <sub>1</sub>
                </div>
              </div>
            </div>
            +
            <div style="
          display: grid;
          grid-template-columns: 10px 10px;
          padding-bottom: 10px;">
              <div>x</div>
              <div style="display: grid; grid-template-rows: 5px 5px;">
                <div>
                  <sup>2</sup>
                </div>
                <div>
                  <sub>2</sub>
                </div>
              </div>
            </div>
            -
            <div>
              2x<sub>2</sub> = 0
            </div>
          </div>
          <div>
            x<sub>1</sub> > 0
          </div>
        </div>
        <div class="accuracy">
          <AccuracyComponent @accuracy="localAccuracy = $event"/>
        </div>
        <div class="variables">
          <div class="variable">
            <span>Максимальное кол-во итераций:</span>
            <InputNumber v-model="maxIteration"/>
          </div>
          <div class="variable">
            <span>Значение x<sub>1</sub> = </span>
            <InputNumber v-model="variableXOne" :minFractionDigits="0" :maxFractionDigits="8"/>
          </div>
          <div class="variable">
            <span>Значение x<sub>2</sub> = </span>
            <InputNumber v-model="variableXTwo" :minFractionDigits="0" :maxFractionDigits="8"/>
          </div>
        </div>
        <div>
          <img style="height:300px;" src="@/assets/images/fourthLab.jpg" alt="graph"/>
        </div>
        <div class="controls">
          <Button label="Решить" @click="findAnswer"/>
        </div>
        <div v-if="answer" class="answer">
          <span>Ответ:</span>
          <div>
            <span>x1 = {{ answer.firstValue }}</span>
            <span>x2 = {{ answer.secondValue }}</span>
            <span>d = {{ answer.d }}</span>
          </div>
        </div>
      </div>
    </template>
    <template #footer>
      Лабораторная выполнена студентом группы 1225и Скрипченко С.Д.
    </template>
  </BasePage>
</template>

<style scoped lang="sass">
.fourth-lab-wrapper
  display: flex
  flex-direction: column
  align-items: flex-start
  width: 100%
  gap: 10px

.equation
  position: relative

  & > span:after
    content: ' '
    display: inline-block
    position: absolute
    height: 1px
    width: 35px
    left: 102px
    top: 5px
    background-color: white
    @media (prefers-color-scheme: light)
      background-color: black

.equation
  position: relative

  & > .brackets
    & > span:nth-child(1)
      display: inline-block
      position: absolute
      left: -10px
      top: 8px

    & > span:nth-child(2)
      display: inline-block
      position: absolute
      left: -10px
      top: 40px

    & > span:nth-child(3)
      display: inline-block
      position: absolute
      left: -10px
      top: 57px

.variables
  display: flex
  flex-direction: column
  gap: 10px

  .variable
    display: flex
    justify-content: flex-start
    align-items: center
    gap: 10px

.answer
  display: flex
  justify-content: flex-start
  align-items: center
  gap: 10px

  & > div
    display: grid
    grid-template-rows: 1fr 1fr
</style>