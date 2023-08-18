import Index from './index.vue'

describe('<Index />', () => {
  it('renders', () => {
    cy.mount(Index)
  })


  describe('Form Component', () => {
    it('should initialize formData with defaultValues', () => {
      cy.mount(Index)
      cy.get('form').within(() => {
        cy.get(':has(label:contains("fieldName"))').find('input').should('have.value', 'initialValue')
        cy.get(':has(label:contains("nestedField"))').find('input').should('have.value', 'nestedInitialValue')
      })
    })

    it('should fill out the form and submit successfully', () => {
      const onSubmitSpy = cy.spy().as('onSubmitSpy');

      cy.mount(Index, { props: { onSubmit: onSubmitSpy } })

      cy.get('button[class="submitButton"]').click().then(() => {
        cy.get('@onSubmitSpy').should('have.been.calledWith', { fieldName: "initialValue", nestedField: { nestedFieldName: "nestedInitialValue" } }, { valid: true, fields: undefined })
      });
    })
  })
})
