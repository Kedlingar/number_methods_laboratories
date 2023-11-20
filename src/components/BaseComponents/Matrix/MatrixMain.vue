<script setup lang="ts">
import {toRefs, watch} from "vue";
import MatrixRow from "@/components/BaseComponents/Matrix/MatrixRow.vue";
import {useNumberMethodsFirstLab} from "@/stores/NumberMethodsLaboratories/FirstLab/firstLabStore.ts";
import {storeToRefs} from "pinia";

const props = defineProps({
  rowCount: {
    type: Number,
    required: true,
    default: 1,
  },
  columnCount: {
    type: Number,
    required: true,
    default: 1,
  }
})

const {rowCount, columnCount} = toRefs(props)

const firstLabStore = useNumberMethodsFirstLab()
const {matrix} = storeToRefs(firstLabStore)

watch([rowCount, columnCount], ([newRowCount, newColumnCount]) => {
  firstLabStore.createMatrix(newRowCount, newColumnCount+1)
})
</script>

<template>
  <div class="matrix-main-wrapper">
    <div class="matrix-rows">
      <MatrixRow
          v-for="(row, i) in matrix"
          :key="`mainMatrix${row.id}number${i}`"
          :row="row"
      />
    </div>
  </div>
</template>

<style scoped lang="sass">
.matrix-rows
  display: flex
  flex-direction: column
</style>