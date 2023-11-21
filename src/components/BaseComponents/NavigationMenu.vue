<template>
  <div class="sidebar-wrapper">
    <div class="menu-wrapper">
      <div class="menu">
        <nav>
          <div class="navigation-menu-items">
            <div
                v-for="menuItem in menuItems"
                :key="menuItem.id"
                :title="menuItem.title"
                class="navigation-menu-item"
            >
              <router-link
                  v-if="menuItem.type=== MenuItemType.Link"
                  :to="{path: `${menuItem.to}`}"
                  class="link"
                  activeClass="active">
                <div class="title">
                  {{menuItem.subtitle}}
                </div>
              </router-link>
            </div>
          </div>
        </nav>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {IMenuItem, MenuItemType} from "@/types";
import {PropType} from 'vue'

defineProps({
  hiddenHeader: {
    type: Boolean,
    default: true
  },
  menuItems: {
    type: Array as PropType<IMenuItem[]>,
    required: true
  }
})
</script>

<style scoped lang="sass">
.sidebar-wrapper
  height: 100vh
  width: 75px
  display: grid
  grid-template-rows: 1fr
  border-right: 2px solid #618ffc

.menu-wrapper
  height: 100%
  display: flex
  flex-direction: column
  justify-content: center
  align-items: center
  overflow-y: scroll
  scrollbar-width: none
  -ms-overflow-style: none
  &::-webkit-scrollbar
    width: 0
    height: 0

.link
  position: relative
  width: 100%
  height: 52px
  display: grid
  text-decoration: none
  grid-template-columns: 85px 1fr
  align-content: center
  color: #717171

.title
  position: relative
  width: 100%
  font-weight: 600
  overflow: hidden
  display: flex
  justify-content: center

.link.active
  transition: .2s ease-in-out
  ::after
    position: absolute
    right: 0
    top: 0
    height: 100%
    width: 2px
    content: ''
    background-color: #618ffc
  .title
    color: #618ffc

@media (prefers-color-scheme: dark)
  .link
    color: #cacaca
</style>
