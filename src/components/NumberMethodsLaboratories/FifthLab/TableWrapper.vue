<script setup lang="ts">
import {ref, watch} from "vue";
import TableColumn from "@/components/NumberMethodsLaboratories/FifthLab/TableColumn.vue";
import {useToast} from "primevue/usetoast";

interface approximatedData {
  id: number,
  approximatedValueX: number,
  approximatedValueY: number,
}

interface ITableColumn {
  id: number,
  x: number,
  y: number,
}

const toast = useToast()
const emit = defineEmits(['tableData', 'experimentalData'])


const tableData = ref<ITableColumn[]>([])
//Неявное уравнение выражающее зависимость между переменными "x" и "y"
const resultString = ref<string>()
//Явная зависимость между "x" и "y" в виде степенной функции
const resultString2 = ref<string>()
//Значения "y" на основе степенной функции
const resultArray = ref<number[]>([])

//Экспериментальные данные
const approximatedDataTable = ref<approximatedData[]>([])

const addColumn = () => {
  if (tableData.value.length < 7) {
    tableData.value.push({
      id: tableData.value.length+1,
      x: 0,
      y: 0,
    })
  } else {
    toast.add({
      severity: 'error',
      summary: 'Ошибка',
      detail: 'Нельзя создать больше 7 значений',
      life: 3000
    })
  }
}

const deleteLastColumn = () => {
  if (tableData.value.length > 0) {
    tableData.value.pop()
  }
}

function calculateSumFrom1ToM(arr: number[], m: number) {
  // Используем метод reduce для выполнения суммы
  return arr.slice(0, m).reduce((accumulator, currentValue) => accumulator + currentValue, 0);
}

/**
 * Решение
 * @param approximated - экспериментальные данные
 */
const startCalculateEmpiricalData = (approximated: approximatedData[]) => {

  /**
   * Тут дальше будет составляться система:
   * b*n + k*∑(i=1;m;Xi) = ∑(i=1;m;Yi)
   * b*∑(i=1;m;Xi) + k*∑(i=1;m;(X^2)i) = ∑(i=1;m;Xi*Yi)
   */

  const b = approximated.length

  const approxDataX: number[] = []
  const approxDataY: number[] = []
  approximated.map((approx: approximatedData) => {
    if (isFinite(approx.approximatedValueX)) {
      approxDataX.push(Number(approx.approximatedValueX.toFixed(4)))
    }
    if (isFinite(approx.approximatedValueY)) {
      approxDataY.push(Number(approx.approximatedValueY.toFixed(4)))
    }
  })

  //Проверить нужно, что длины массивов одинаковые и не равны нулю
  if (
    (approxDataX.length === approxDataY.length)
    &&
    (approxDataY.length !== 0 && approxDataX.length !== 0)
  ) {
    //Начинаем решать систему, вычисляем каждое значение
    const f11 = b //bn
    //А тут при помощи функции сумматора вычисляем сумму всех элементов
    const f12 = calculateSumFrom1ToM(approxDataX, approxDataX.length) //sum 1
    const f13 = calculateSumFrom1ToM(approxDataY, approxDataY.length) //sum 2
    const squaredArray = approxDataX.map(num => Number((num ** 2).toFixed(4)));
    //Важно, чтобы у массивов была одинаковая длина
    const combinedArray = approxDataX.map((x, index) => x * approxDataY[index]);
    const f21 = calculateSumFrom1ToM(approxDataX, approxDataX.length) //bn
    const f22 = calculateSumFrom1ToM(squaredArray, squaredArray.length) //bn //sum 1
    const f23 = calculateSumFrom1ToM(combinedArray, combinedArray.length) //sum 2

    // Тестовые данные, на которых проверялась работоспособность:
    // const f11 = 5
    // const f12 = 4.787
    // const f13 = 19.196
    // const f21 = 4.787
    // const f22 = 6.2
    // const f23 = 21.535

    //Метод Крамера
    const detA = f11 * f22 - f12 * f21
    const detB = f13 * f22 - f12 * f23
    const detK = f11 * f23 - f13 * f21
    //Решив систему находим "b" и "k"
    const resultB = Number((detB / detA).toFixed(3))
    const resultK = Number((detK / detA).toFixed(3))

    // console.log(`Решение системы:`);
    // console.log(`b = ${resultB}`);
    // console.log(`k = ${resultK}`);

    //Неявное уравнение выражающее зависимость между переменными "x" и "y"
    resultString.value = `ln(y) = ${resultK}*ln(x)+${resultB}`
    //Явная зависимость между "x" и "y" в виде степенной функции
    resultString2.value = `y=${Math.exp(resultB).toFixed(4)}*x^${resultK.toFixed(4)}`
    //Значения "y" на основе степенной функции
    resultArray.value = []

    //Тут вычисляем значения y на основе степенной функции, которая выглядит как:
    /**
     * y = e^resultB * x^resultK
     */
    tableData.value.map((data: ITableColumn) => {
      const value = Math.exp(resultB) * Math.pow(data.x, resultK)
      resultArray.value.push(value)
    })
  }
}

watch(approximatedDataTable, (value) => {
  emit('experimentalData', value)
  startCalculateEmpiricalData(value)
},{deep: true})

watch(tableData, () => {
  emit('tableData', tableData.value)
}, {deep: true})

watch(tableData, (value) => {
  approximatedDataTable.value = []
  value.map((column: ITableColumn) => {
    approximatedDataTable.value.push({
      id: column.id,
      approximatedValueX: Math.log(Math.abs(column.x)),
      approximatedValueY: Math.log(Math.abs(column.y)),
    })
  })
}, {deep: true})

/**
 * Найти явный вид эмпирической формулы y=Q(x,a,B)
 * и построить график эмпирической функции; ???????????????????????????
 */
</script>

<template>
  <div class="table-wrapper">
    <div class="column-controls">
      <div>
        <Button @click="addColumn" icon="pi pi-plus"/>
      </div>
      <div>
        <Button @click="deleteLastColumn" icon="pi pi-minus" severity="danger" />
      </div>
      <div>{{resultString}}</div>
      <div>
        {{ resultString2 }}
      </div>
    </div>
    <div class="table-start">
      <div>x</div>
      <div>y</div>
      <div></div>
      <div></div>
    </div>
    <div class="column-list-wrapper" style="position: relative;">
      <div class="columns-list-main" v-if="tableData.length > 0">
        <div class="columns-list">
          <TableColumn
              v-for="column in tableData"
              :column-data="column"
          />
        </div>
        <div style="display: flex; gap: 5px;">
          <div v-for="approximated in approximatedDataTable">
            <div>
              <InputNumber :disabled="true" :model-value="approximated.approximatedValueX" :max="10000" :max-fraction-digits="4"/>
            </div>
            <div>
              <InputNumber :disabled="true" :model-value="approximated.approximatedValueY" :max="10000" :max-fraction-digits="4"/>
            </div>
          </div>
        </div>
        <div style="display: flex; gap: 5px;">
          <div v-for="res in resultArray">
            <InputNumber :disabled="true" :model-value="res" :max="10000" :max-fraction-digits="4"/>
          </div>
        </div>
      </div>
      <div class="list-empty" v-else>
        <div>
          Список значений пуст
        </div>
        <div>

        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="sass">
.table-wrapper
  display: flex
  border: 1px solid #618ffc
  width: max-content
  & > .table-start
    display: grid
    grid-template-rows: 1fr 1fr 1fr 1fr
    & > div:nth-child(2)
      border-bottom: 1px solid #618ffc
    & > div:nth-child(1), div:nth-child(2), div:nth-child(4)
      border-right: 1px solid #618ffc
    & > div:nth-child(3)
      border-bottom: 1px solid #618ffc
    & > div
      padding: 5px
      display: flex
      align-items: center
      justify-content: center
    & > div:nth-child(3)
      border-right: 1px solid #618ffc
  & > .column-controls
    display: grid
    grid-template-rows: 1fr 1fr 1fr 1fr
    & > div
      display: flex
      align-items: center
      justify-content: center
      width: 100%
      padding: 5px
    & > div:nth-child(2)
      border-bottom: 1px solid #618ffc
    & > div:nth-child(1), div:nth-child(2), div:nth-child(3), div:nth-child(4)
      border-right: 1px solid #618ffc
    & > div:nth-child(3)
      border-bottom: 1px solid #618ffc
.column-list-wrapper
  display: flex
.columns-list-main
  display: grid
  grid-template-rows: 2fr 1fr 1fr
  & > div:nth-child(2)
    display: flex
    justify-content: center
    align-items: center
    padding: 5px
    border-bottom: 1px solid #618ffc
  & > div:nth-child(3)
    display: flex
    justify-content: center
    align-items: center
    padding: 5px
  :deep(.p-inputtext.p-component.p-inputnumber-input)
    width: 100px
.columns-list
  display: flex
  justify-content: center
  align-items: center
  gap: 5px
  padding: 5px
  border-bottom: 1px solid #618ffc
.list-empty
  display: grid
  grid-template-rows: 2fr 1fr
  & > div:first-child
    display: flex
    justify-content: center
    align-items: center
    border-bottom: 1px solid #618ffc
  & > div
    padding: 5px
</style>
