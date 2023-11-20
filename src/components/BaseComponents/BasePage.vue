<script setup lang="ts">

</script>

<template>
  <div class="base-page-wrapper">
    <div class="header">
      <slot name="header"/>
    </div>
    <div class="body">
      <slot name="body"/>
    </div>
    <div class="footer">
      <slot name="footer"/>
    </div>
  </div>
</template>

<style scoped lang="sass">
.base-page-wrapper
  height: 100%
  max-height: 100vh
  width: 100%
  display: grid
  grid-template-rows: max-content 1fr max-content
  gap: 10px
  & > .header, .body, .footer
    padding: 1rem
  & > .body
    max-height: 100%
    overflow: auto
</style>