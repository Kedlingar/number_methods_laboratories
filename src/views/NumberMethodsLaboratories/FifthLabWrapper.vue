<script setup lang="ts">
import BasePage from "@/components/BaseComponents/BasePage.vue";
import TableWrapper from "@/components/NumberMethodsLaboratories/FifthLab/TableWrapper.vue";
import {ref, watch} from "vue";

interface ITableColumn {
  id: number,
  x: number,
  y: number,
}

interface IDataSet {
  id: number,
  label: string,
  data: number[] | null,
  fill: boolean,
  borderColor: string,
}

interface IDataGraph {
  labels: string[] | number[] | null,
  datasets: IDataSet[],
}

interface approximatedData {
  id: number,
  approximatedValueX: number,
  approximatedValueY: number,
}

const basicOptions = ref(
    {
      plugins: {
        legend: {
          labels: {
            color: '#495057'
          }
        }
      },
      scales: {
        x: {
          ticks: {
            color: '#495057'
          },
          grid: {
            color: '#ebedef'
          }
        },
        y: {
          ticks: {
            color: '#495057'
          },
          grid: {
            color: '#ebedef'
          }
        }
      }
    }
)

const tableDataValue = ref<ITableColumn[]>([])
const localExperimentalData = ref<approximatedData[]>([])

const dataGraph = ref<IDataGraph>({
  //x
  labels: [],
  datasets: [
    {
      id: 1,
      label: 'Заданные точки',
      //y
      data: [],
      fill: true,
      borderColor: '#42A5F5',
    },
  ]
})

const experimentalDataGraph = ref<IDataGraph>({
  //x
  labels: [],
  datasets: [
    {
      id: 2,
      label: 'Экспериментальные точки',
      fill: true,
      data: [],
      borderColor: '#1ab20a',
    }
  ]
})

/**
 * Тут будет начинаться решение
 */

//region Решение
/**
 * Выбрал 6 формулу
 * Выравнивание данных (преобразование переменных):
 * X = ln(x)
 * Y = ln(y)
 * Эмпирическая формула:
 * y = ax^β
 * a = e^b
 * β = k
 *
 *
 */

//

//endregion


const setExperimentalData = (event: approximatedData[]) => {
  localExperimentalData.value = event
}

watch(tableDataValue, (value) => {
  dataGraph.value = {
    labels: [],
    datasets: [],
  }
  let listX: number[] = []
  let listY: number[] = []

  value.map((tableData: ITableColumn) => {
    listX.push(tableData.x)
    listY.push(tableData.y)
  })
  dataGraph.value = {
    labels: listX,
    datasets: [
      {
        id: 1,
        label: 'Заданные точки',
        //y
        data: listY,
        fill: true,
        borderColor: '#42A5F5',
      },
    ]
  }
}, {deep: true})

watch(localExperimentalData, (value) => {
  experimentalDataGraph.value = {
    labels: [],
    datasets: [],
  }
  let listX: number[] = []
  let listY: number[] = []

  value.map((tableData: approximatedData) => {
    listX.push(Number(tableData.approximatedValueX.toFixed(4)))
    listY.push(Number(tableData.approximatedValueY.toFixed(4)))
  })
  experimentalDataGraph.value = {
    labels: listX,
    datasets: [
      {
        id: 2,
        label: 'Экспериментальные точки',
        //y
        data: listY,
        fill: true,
        borderColor: '#1ab20a',
      },
    ]
  }
}, {deep: true})
</script>

<template>
  <BasePage>
    <template #header>
      Лабораторная работа №5 Аппроксимация данных линейной функцией (МНК)
    </template>
    <template #body>
      <div class="fifth-lab">
        <TableWrapper
            @table-data="tableDataValue = $event"
            @experimental-data="setExperimentalData($event)"
        />
        <div class="chart-wrapper">
          <Chart type="line" :data="dataGraph" :options="basicOptions"/>
        </div>
        <div class="chart-wrapper">
          <Chart type="line" :data="experimentalDataGraph" :options="basicOptions"/>
        </div>
      </div>
    </template>
    <template #footer>
      Лабораторная выполнена студентом группы 1225и Скрипченко С.Д.
    </template>
  </BasePage>
</template>

<style scoped lang="sass">
.fifth-lab
  display: grid
  grid-template-rows: max-content max-content max-content
  gap: 20px
.chart-wrapper
  width: 600px
  height: 300px
</style>