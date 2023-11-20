<script setup lang="ts">
import NavigationMenu from "@/components/BaseComponents/NavigationMenu.vue";
import {useAppStore} from "@/stores/App/appStore.ts";
import {storeToRefs} from "pinia";
const appStore = useAppStore()
const {menuItems} = storeToRefs(appStore)
</script>

<template>
  <div class="main-page-wrapper">
    <NavigationMenu :menu-items="menuItems"/>
    <router-view></router-view>
  </div>
  <Toast/>
</template>

<style scoped lang="sass">
.main-page-wrapper
  width: 100%
  height: 100%
  display: grid
  grid-template-columns: max-content 1fr
</style>