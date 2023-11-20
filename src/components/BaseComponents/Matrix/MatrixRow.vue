<script setup lang="ts">
import MatrixCell from "@/components/BaseComponents/Matrix/MatrixCell.vue";
import {PropType, toRefs} from "vue";
import {IMatrixRow} from "@/types";

const props = defineProps({
  row: {
    type: Object as PropType<IMatrixRow>,
    required: true,
  }
})

const {row} = toRefs(props)
</script>

<template>
  <div class="matrix-row-wrapper">
    <div class="matrix-row-cells">
      <MatrixCell
          v-for="(cell, i) in row.values"
          :key="`cell${cell.id}count${i}`"
          :id-row="row.id"
          :matrix-cell="cell"
      />
    </div>
  </div>
</template>

<style scoped lang="sass">
.matrix-row-cells
  display: flex
  flex-direction: row
</style>