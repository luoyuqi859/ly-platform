import { defineStore } from 'pinia'


export enum DeviceType {
    Mobile,
    Desktop,
}

export interface AppState {
    device: DeviceType
    sidebar: {
        opened: boolean
        withoutAnimation: boolean
    }
    language: string
    size: string
}


export const useAppStore = defineStore("app",()=>{


})