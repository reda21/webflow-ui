import { defineNuxtModule, addComponentsDir, createResolver } from '@nuxt/kit'

export default defineNuxtModule({
  meta: {
    name: 'webflow-ui',
    configKey: 'webflowUi'
  },
  setup(options, nuxt) {
    console.log('📦 webflow-ui module is loading...')
    const { resolve } = createResolver(import.meta.url)

    // 1. Enregistrer le répertoire des composants
    addComponentsDir({
      path: resolve('./components'),
      prefix: 'Ui',
      pathPrefix: false,
    })

    // 2. Ajouter à la transpilation pour que Nuxt compile les fichiers .vue
    nuxt.options.build.transpile.push(resolve('./'))

    // 3. Autoriser Vite à accéder aux fichiers de la bibliothèque (nécessaire en monorepo)
    nuxt.hook('vite:extendConfig', (config) => {
      config.server = config.server || {}
      config.server.fs = config.server.fs || {}
      config.server.fs.allow = config.server.fs.allow || []
      config.server.fs.allow.push(resolve('../'))
    })
  }
})
