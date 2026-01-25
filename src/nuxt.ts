import {
  defineNuxtModule,
  addComponentsDir,
  createResolver,
  addPlugin,
} from "@nuxt/kit";
import type { NuxtModule } from "@nuxt/schema";

const module: NuxtModule<any> = defineNuxtModule({
  meta: {
    name: "webflow-ui",
    configKey: "webflowUi",
  },
  setup(options, nuxt) {
    console.log("📦 webflow-ui module is loading...");
    const { resolve } = createResolver(import.meta.url);

    // 1. Enregistrer le répertoire des composants
    addComponentsDir({
      path: resolve("./components"),
      prefix: "Ui",
      pathPrefix: false,
    });

    // 2. Ajouter à la transpilation pour que Nuxt compile les fichiers .vue
    nuxt.options.build.transpile.push(resolve("./"));

    // 3. Autoriser Vite à accéder aux fichiers de la bibliothèque (nécessaire en monorepo)
    nuxt.hook("vite:extendConfig", (config: any) => {
      config.server = config.server || {};
      config.server.fs = config.server.fs || {};
      config.server.fs.allow = config.server.fs.allow || [];
      config.server.fs.allow.push(resolve("../"));
    });

    // 4. Injecter la configuration globale
    // @ts-ignore
    nuxt.options.runtimeConfig.public.webflowUi = options;

    // 5. Créer un plugin pour injecter la config dans Vue
    addPlugin(resolve("./runtime/plugin.ts"));
  },
});

export default module;
