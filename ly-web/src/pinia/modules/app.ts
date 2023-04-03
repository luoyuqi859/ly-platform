
import { settings } from '@/settings'
import Cookies from 'js-cookie'
import { defineStore } from 'pinia'


const { sideTheme, showSettings, topNav, tagsView, fixedHeader, sidebarLogo, dynamicTitle } = settings
const storageSetting = JSON.parse(localStorage.getItem('layout-setting') as string) || ''


export const useAppStore = defineStore("app", {
    state: () => ({
        sidebar: {
            opened: true,
            withoutAnimation: false,
            hide: false
        },
        device: 'desktop',
        size: Cookies.get('size') || 'default',
        title: '',
        theme: storageSetting.theme || '#409EFF',
        sideTheme: storageSetting.sideTheme || sideTheme,
        showSettings: showSettings,
        topNav: storageSetting.topNav === undefined ? topNav : storageSetting.topNav,
        tagsView: storageSetting.tagsView === undefined ? tagsView : storageSetting.tagsView,
        fixedHeader: storageSetting.fixedHeader === undefined ? fixedHeader : storageSetting.fixedHeader,
        sidebarLogo: storageSetting.sidebarLogo === undefined ? sidebarLogo : storageSetting.sidebarLogo,
        dynamicTitle: storageSetting.dynamicTitle === undefined ? dynamicTitle : storageSetting.dynamicTitle
    }),
    actions: {
        toggleSideBar(withoutAnimation: boolean) {
            if (this.sidebar.hide) {
                return false;
            }
            this.sidebar.opened = !this.sidebar.opened
            this.sidebar.withoutAnimation = withoutAnimation
        },
        toggleDevice(device: string) {
            this.device = device
        },
        closeSideBar(withoutAnimation: boolean) {
            this.sidebar.opened = false
            this.sidebar.withoutAnimation = withoutAnimation
        },
    }
})