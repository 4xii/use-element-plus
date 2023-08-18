import Index from './index.vue'

describe('<Index />', () => {
  it('renders', () => {
    cy.mount(Index)
  })

  
describe('Form Component', () => {
  it('should fill out the form and submit successfully', () => {
    cy.mount(Index)
    cy.get('form').within(() => {
      cy.get(':has(label:contains("Activity name"))').find('input').should('have.value','Hello')
      cy.get(':has(label:contains("delivery"))').find('input').should('have.attr','aria-checked','true')
    })
  })
})
})
