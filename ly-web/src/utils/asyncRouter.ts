const viewModules = import.meta.glob('../views/**/*.vue')
const pluginModules = import.meta.glob('../plugin/**/*.vue')



export const asyncRouterHandle = (asyncRouter: any) => {
    asyncRouter.forEach((item: any) => {
        if (item.component) {
            if (item.component.split('/')[0] === 'view') {
                item.component = dynamicImport(viewModules, item.component)
            } else if (item.component.split('/')[0] === 'plugin') {
                item.component = dynamicImport(pluginModules, item.component)
            }
        } else {
            delete item['component']
        }
        if (item.children) {
            asyncRouterHandle(item.children)
        }
    })
}


function dynamicImport(
    dynamicViewsModules: any,
    component: any,
) {
    const keys = Object.keys(dynamicViewsModules)
    const matchKeys = keys.filter((key) => {
        const k = key.replace('../', '')
        return k === component
    })
    const matchKey = matchKeys[0]

    return dynamicViewsModules[matchKey]
}
