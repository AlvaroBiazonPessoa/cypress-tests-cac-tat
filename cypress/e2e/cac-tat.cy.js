describe('Central de Atendimento ao Cliente TAT', () => {

  beforeEach(() => {
    const cacTatUrl = 'https://cac-tat-v3.s3.eu-central-1.amazonaws.com/index.html'
    cy.visit(cacTatUrl)
  })

  it('verificar o título da aplicação', () => {
    const catTatTitle = 'Central de Atendimento ao Cliente TAT'
    cy.title().should('be.equal', catTatTitle)
  })

  it('preencher os campos obrigatórios e enviar o formulário', () => {
    const valueOfTheMandatoryFieldNome = 'Álvaro'
    const valueOfTheMandatoryFieldSobrenome = 'Biazon Pessoa'
    const valueOfTheMandatoryFieldEmail = 'alvaro.b.pessoa@email.com'
    const valueOfTheMandatoryFieldFeedback = 'Sem feedbacks'
    const selectorOfTheFieldNome = '#firstName'
    const selectorOfTheFieldSobrenome = '#lastName'
    const selectorOfTheFieldEmail = '#email'
    const selectorOfTheFieldFeedback = '#open-text-area'
    const selectorOfTheButtonEnviar = '#white-background > form > button'
    const successMessageBoxElementClass = '.success'
    cy.get(selectorOfTheFieldNome).should('be.visible')
    cy.get(selectorOfTheFieldNome).type(valueOfTheMandatoryFieldNome)
    cy.get(selectorOfTheFieldNome).should('have.value', valueOfTheMandatoryFieldNome)
    cy.get(selectorOfTheFieldSobrenome).should('be.visible')
    cy.get(selectorOfTheFieldSobrenome).type(valueOfTheMandatoryFieldSobrenome)
    cy.get(selectorOfTheFieldSobrenome).should('have.value', valueOfTheMandatoryFieldSobrenome)
    cy.get(selectorOfTheFieldEmail).should('be.visible')
    cy.get(selectorOfTheFieldEmail).type(valueOfTheMandatoryFieldEmail)
    cy.get(selectorOfTheFieldEmail).should('have.value', valueOfTheMandatoryFieldEmail)
    cy.get(selectorOfTheFieldFeedback).should('be.visible')
    cy.get(selectorOfTheFieldFeedback).type(valueOfTheMandatoryFieldFeedback)
    cy.get(selectorOfTheFieldFeedback).should('have.value', valueOfTheMandatoryFieldFeedback)
    cy.get(selectorOfTheButtonEnviar).click()
    cy.get(successMessageBoxElementClass).should('be.visible')
  })

  it('exibir mensagem de erro ao submeter o formulário com um e-mail com formatação inválida', () => {
    const valueOfTheMandatoryFieldNome = 'Mariana'
    const valueOfTheMandatoryFieldSobrenome = 'Bridi Vital'
    const incorrectValueOfTheMandatoryFieldEmail = 'mariana.b.vital#email.com.@.br'
    const valueOfTheMandatoryFieldFeedback = 'Adorei!'
    const selectorOfTheFieldNome = '#firstName'
    const selectorOfTheFieldSobrenome = '#lastName'
    const selectorOfTheFieldEmail = '#email'
    const selectorOfTheFieldFeedback = '#open-text-area'
    const selectorOfTheButtonEnviar = '#white-background > form > button'
    const errorMessageBoxElementClass = '.error'
    cy.get(selectorOfTheFieldNome).should('be.visible')
    cy.get(selectorOfTheFieldNome).type(valueOfTheMandatoryFieldNome)
    cy.get(selectorOfTheFieldNome).should('have.value', valueOfTheMandatoryFieldNome)
    cy.get(selectorOfTheFieldSobrenome).should('be.visible')
    cy.get(selectorOfTheFieldSobrenome).type(valueOfTheMandatoryFieldSobrenome)
    cy.get(selectorOfTheFieldSobrenome).should('have.value', valueOfTheMandatoryFieldSobrenome)
    cy.get(selectorOfTheFieldEmail).should('be.visible')
    cy.get(selectorOfTheFieldEmail).type(incorrectValueOfTheMandatoryFieldEmail)
    cy.get(selectorOfTheFieldEmail).should('have.value', incorrectValueOfTheMandatoryFieldEmail)
    cy.get(selectorOfTheFieldFeedback).should('be.visible')
    cy.get(selectorOfTheFieldFeedback).type(valueOfTheMandatoryFieldFeedback)
    cy.get(selectorOfTheFieldFeedback).should('have.value', valueOfTheMandatoryFieldFeedback)
    cy.get(selectorOfTheButtonEnviar).click()
    cy.get(errorMessageBoxElementClass).should('be.visible')
  })

})