import { defineStore } from "pinia"
import { routes } from '@/router/index';



export const useRouterStore = defineStore('router', () => {
    const state: any = {
        routes: routes
    };


    return {
        state,

    }
})
