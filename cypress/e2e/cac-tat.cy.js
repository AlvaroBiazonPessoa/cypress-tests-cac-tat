describe('Central de Atendimento ao Cliente TAT', () => {

  beforeEach(() => {
    const cacTatUrl = 'https://cac-tat-v3.s3.eu-central-1.amazonaws.com/index.html'
    cy.visit(cacTatUrl)
  })

  it('verificar o título da aplicação', () => {
    const catTatTitle = 'Central de Atendimento ao Cliente TAT'
    cy.title().should('be.equal', catTatTitle)
  })

})