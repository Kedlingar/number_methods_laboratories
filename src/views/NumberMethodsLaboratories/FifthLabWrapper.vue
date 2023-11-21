<script setup lang="ts">
import BasePage from "@/components/BaseComponents/BasePage.vue";
import TableWrapper from "@/components/NumberMethodsLaboratories/FifthLab/TableWrapper.vue";
import {ref, watch} from "vue";

interface ITableColumn {
  id: number,
  x: number,
  y: number,
}

interface IPairVariable {
  x: number,
  y: number,
}

interface IDataSet {
  id: number,
  label: string,
  data: IPairVariable[] | null,
  fill: boolean,
  borderColor: string,
  backgroundColor: string,
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
          type: 'linear',
          position: 'bottom',
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
      borderColor: '#1a5e93',
      backgroundColor: '#818585',
    },
  ]
})

const experimentalDataGraph = ref<IDataGraph>({
  labels: [],
  datasets: [
    {
      id: 2,
      label: 'Экспериментальные точки',
      fill: true,
      data: [],
      borderColor: '#1ab20a',
      backgroundColor: '#818585',
    }
  ]
})

const setExperimentalData = (event: approximatedData[]) => {
  localExperimentalData.value = event
}

watch(tableDataValue, (value) => {
  dataGraph.value = {
    labels: [],
    datasets: [],
  }
  let listX: number[] = []
  let listValues: IPairVariable[] = []

  value.map((tableData: ITableColumn) => {
    listValues.push({
      x: tableData.x,
      y:tableData.y
    })
  })
  dataGraph.value = {
    labels: listX,
    datasets: [
      {
        id: 1,
        label: 'Заданные точки',
        data: listValues,
        fill: true,
        borderColor: '#1a5e93',
        backgroundColor: '#818585',
      },
    ]
  }
}, {deep: true})

watch(localExperimentalData, (value) => {
  experimentalDataGraph.value = {
    labels: [],
    datasets: [],
  }
  let listValues: IPairVariable[] = []
  value.map((tableData: approximatedData) => {
    listValues.push(
        {
          x: Number(tableData.approximatedValueX.toFixed(4)),
          y: Number(tableData.approximatedValueY.toFixed(4)),
        })
  })
  experimentalDataGraph.value = {
    labels: [],
    datasets: [
      {
        id: 2,
        label: 'Экспериментальные точки',
        data: listValues,
        fill: true,
        borderColor: '#1ab20a',
        backgroundColor: '#818585',
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