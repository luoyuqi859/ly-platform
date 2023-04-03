import { App } from 'vue';
import * as components from '@element-plus/icons-vue';

export default {
  install: (app: App): void => {
    for (const key in components) {
      const componentConfig = components[key as keyof typeof components];
      app.component(componentConfig.name, componentConfig);
    }
  },
};