import { defineStore } from "pinia";

export const useStore = defineStore('index', {
    persist: true, //pinia持久化
    state() {
        return {
            theme: true,
            titleBar: true,
        }
    },
    getters: {

    },
    actions: {

    },
})