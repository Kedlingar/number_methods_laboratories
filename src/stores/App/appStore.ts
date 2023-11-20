import {defineStore} from "pinia";
import {StateRouterStore} from "@/stores/App/state-router-store.ts";

export const useAppStore = defineStore('appStore', {
    state: () => ({
        ...StateRouterStore,
    }),
    actions: {

    },
    getters: {

    },
})