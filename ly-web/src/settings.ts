interface AppConfig {
    /**
     * 网页标题
     */
    title: string;
    /**
     * 侧边栏主题 深色主题theme-dark，浅色主题theme-light
     */
    sideTheme: 'theme-dark' | 'theme-light';
    /**
     * 是否系统布局配置
     */
    showSettings: boolean;
  
    /**
     * 是否显示顶部导航
     */
    topNav: boolean;
  
    /**
     * 是否显示 tagsView
     */
    tagsView: boolean;
  
    /**
     * 是否固定头部
     */
    fixedHeader: boolean;
  
    /**
     * 是否显示logo
     */
    sidebarLogo: boolean;
  
    /**
     * 是否显示动态标题
     */
    dynamicTitle: boolean;
  
    /**
     * @type {string | array} 'production' | ['production', 'development']
     * @description Need show err logs component.
     * The default is only used in the production env
     * If you want to also use it in dev, you can pass ['production', 'development']
     */
    errorLog: 'production' | string[];
  }
  
  export const settings: AppConfig = {
    title: import.meta.env.VITE_APP_TITLE,
    sideTheme: 'theme-dark',
    showSettings: false,
    topNav: false,
    tagsView: true,
    fixedHeader: false,
    sidebarLogo: true,
    dynamicTitle: false,
    errorLog: 'production'
  };