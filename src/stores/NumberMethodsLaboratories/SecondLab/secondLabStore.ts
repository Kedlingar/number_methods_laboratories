import {defineStore} from "pinia";
import {ISecondLabStore} from "src/types/Stores/numberMethodsLaboratories/secondLab";

export const useNumberMethodsSecondLab = defineStore('numberMethodsSecondLab', {
    state: (): ISecondLabStore => ({
        test: [],
    }),
    actions: {},
    getters: {}
})