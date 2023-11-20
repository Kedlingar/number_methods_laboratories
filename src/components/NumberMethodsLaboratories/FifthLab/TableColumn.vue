<script setup lang="ts">
import {PropType, ref, watch} from "vue";

const props = defineProps({
  columnData: {
    type: Object as PropType<ITableColumn>,
    required: true,
  }
})

interface ITableColumn {
  id: number,
  x: number,
  y: number,
}

const localColumnData = ref<ITableColumn>(props.columnData)

watch(localColumnData, (value) => {
  if (!value.x) {
    value.x = 0
  }
  if (!value.y) {
    value.y = 0
  }
}, {deep: true})
</script>

<template>
  <div class="table-column-wrapper">
    <div class="x">
      <InputNumber v-model="localColumnData.x" :max="10000" :max-fraction-digits="4"/>
    </div>
    <div class="y">
      <InputNumber v-model="localColumnData.y" :max="10000" :max-fraction-digits="4"/>
    </div>
  </div>
</template>

<style scoped lang="sass">
.table-column-wrapper
  display: grid
  grid-template-rows: 1fr 1fr
  width: min-content
  height: 100%
  gap: 5px
  & > div
    display: flex
    justify-content: center
    align-items: center
:deep(.p-inputtext.p-component.p-inputnumber-input)
  width: 100px
@media (prefers-color-scheme: light)
  :deep(.p-inputtext.p-component.p-inputnumber-input)
    background-color: white
    color: black
</style>