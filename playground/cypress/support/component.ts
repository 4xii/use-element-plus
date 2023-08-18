// component.ts
import './commands'
import { mount } from 'cypress/vue'
declare global {
  namespace Cypress {
    interface Chainable {
      mount: typeof mount
    }
  }
}
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
Cypress.Commands.add('mount', (component, options = {}) => {
  options.global = options.global || {}
  options.global.components = options.global.components || {}
  options.global.plugins = options.global.plugins || []

  options.global.plugins.push({
    install(app) {
      app.use(ElementPlus)
    },
  })

  return mount(component, options)
})
