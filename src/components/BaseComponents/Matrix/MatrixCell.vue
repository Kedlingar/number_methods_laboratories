<script setup lang="ts">
import {computed, onMounted, PropType, ref, watch} from "vue";
import {IMatrixCell} from "@/types";
import {useNumberMethodsFirstLab} from "@/stores/NumberMethodsLaboratories/FirstLab/firstLabStore.ts";

const props = defineProps({
  matrixCell: {
    type: Object as PropType<IMatrixCell>,
    required: true,
  },
  idRow: {
    type: Number,
    required: true,
  }
})

const localCellValue = ref<number>(0)
const firstLabStore = useNumberMethodsFirstLab()
const setNewValueForCell = (event: number | null) => {
  if (props.matrixCell && event) {
    firstLabStore.updateValueCell(props.idRow, props.matrixCell.id, event)
  } else {
    firstLabStore.updateValueCell(props.idRow, props.matrixCell.id, 0)
  }
}
const isLastColumn = computed(() => {
  return firstLabStore.isLastCellOfColumn(props.matrixCell.id, props.idRow)
})

watch(() => props.matrixCell, () => {
  if (props.matrixCell) {
    if (props.matrixCell.value) {
      localCellValue.value = props.matrixCell.value
    } else {
      localCellValue.value = 0
    }
  } else {
    localCellValue.value = 0
  }
}, {deep: true})

watch(localCellValue, (value) => {
  if (value == null) {
    localCellValue.value = 0
  }
})

onMounted(() => {
  if (props.matrixCell) {
    if (props.matrixCell.value) {
      localCellValue.value = props.matrixCell.value
    } else {
      localCellValue.value = 0
    }
  } else {
    localCellValue.value = 0
  }
})
</script>

<template>
  <div class="matrix-cell-wrapper" :class="{'is-last-cell': isLastColumn}">
    <div class="matrix-cell-number">
      {{idRow+1}}/{{matrixCell.id+1}}
    </div>
    <div class="matrix-cell-value">
      <InputNumber
          v-model="localCellValue"
          @update:model-value="setNewValueForCell($event)"
      />
    </div>
  </div>
</template>

<style scoped lang="sass">
.matrix-cell-wrapper
  position: relative
  padding: 0.5em
  border: 1px solid #4f4f4f
  margin: 0.1em
  display: grid
  grid-template-rows: max-content 1fr
  gap: 5px
.matrix-cell-number
  display: flex
  justify-content: center
  align-items: center
.matrix-cell-value
  ::v-deep(.p-inputnumber-input)
    width: 75px
.is-last-cell
  background-color: #5b7c92
</style>