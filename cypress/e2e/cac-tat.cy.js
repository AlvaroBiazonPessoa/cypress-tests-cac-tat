const { faker } = require('@faker-js/faker')

describe('Central de Atendimento ao Cliente TAT', () => {

  const cacTatUrl = 'https://cac-tat-v3.s3.eu-central-1.amazonaws.com/index.html'
  const selectorOfTheFieldName = '#firstName'
  const selectorOfTheFieldLastName = '#lastName'
  const selectorOfTheFieldEmail = '#email'

  beforeEach(() => {
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
    const selectorOfTheFieldFeedback = '#open-text-area'
    const selectorOfTheButtonEnviar = '#white-background > form > button'
    const successMessageBoxElementClass = '.success'
    cy.get(selectorOfTheFieldName).should('be.visible')
    cy.get(selectorOfTheFieldName).type(valueOfTheMandatoryFieldNome)
    cy.get(selectorOfTheFieldName).should('have.value', valueOfTheMandatoryFieldNome)
    cy.get(selectorOfTheFieldLastName).should('be.visible')
    cy.get(selectorOfTheFieldLastName).type(valueOfTheMandatoryFieldSobrenome)
    cy.get(selectorOfTheFieldLastName).should('have.value', valueOfTheMandatoryFieldSobrenome)
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
    const selectorOfTheFieldFeedback = '#open-text-area'
    const selectorOfTheButtonEnviar = '#white-background > form > button'
    const errorMessageBoxElementClass = '.error'
    cy.get(selectorOfTheFieldName).should('be.visible')
    cy.get(selectorOfTheFieldName).type(valueOfTheMandatoryFieldNome)
    cy.get(selectorOfTheFieldName).should('have.value', valueOfTheMandatoryFieldNome)
    cy.get(selectorOfTheFieldLastName).should('be.visible')
    cy.get(selectorOfTheFieldLastName).type(valueOfTheMandatoryFieldSobrenome)
    cy.get(selectorOfTheFieldLastName).should('have.value', valueOfTheMandatoryFieldSobrenome)
    cy.get(selectorOfTheFieldEmail).should('be.visible')
    cy.get(selectorOfTheFieldEmail).type(incorrectValueOfTheMandatoryFieldEmail)
    cy.get(selectorOfTheFieldEmail).should('have.value', incorrectValueOfTheMandatoryFieldEmail)
    cy.get(selectorOfTheFieldFeedback).should('be.visible')
    cy.get(selectorOfTheFieldFeedback).type(valueOfTheMandatoryFieldFeedback)
    cy.get(selectorOfTheFieldFeedback).should('have.value', valueOfTheMandatoryFieldFeedback)
    cy.get(selectorOfTheButtonEnviar).click()
    cy.get(errorMessageBoxElementClass).should('be.visible')
  })

  it('preencher o campo Telefone com valor não-numérico', () => {
    const selectorOfTheFieldTelephone = '#phone'
    const incorrectValueOfTheFieldTelephone = 'dois quatro cinco sete'
    cy.get(selectorOfTheFieldTelephone).should('be.visible')
    cy.get(selectorOfTheFieldTelephone).type(incorrectValueOfTheFieldTelephone)
    cy.get(selectorOfTheFieldTelephone).should('be.empty')
  })

  it('preencher e limpar os campos Nome, Sobrenome, E-mail e Telefone', () => {
    const valueOfTheMandatoryFieldNome = 'Álvaro'
    const valueOfTheMandatoryFieldSobrenome = 'Biazon Pessoa'
    const valueOfTheMandatoryFieldEmail = 'alvaro.b.pessoa@email.com'
    const valueOfTheMandatoryFieldFeedback = 'Sem feedbacks'
    const selectorOfTheFieldFeedback = '#open-text-area'
    cy.get(selectorOfTheFieldName).should('be.visible')
    cy.get(selectorOfTheFieldName).type(valueOfTheMandatoryFieldNome)
    cy.get(selectorOfTheFieldName).should('have.value', valueOfTheMandatoryFieldNome)
    cy.get(selectorOfTheFieldName).clear()
    cy.get(selectorOfTheFieldName).should('be.empty')
    cy.get(selectorOfTheFieldLastName).should('be.visible')
    cy.get(selectorOfTheFieldLastName).type(valueOfTheMandatoryFieldSobrenome)
    cy.get(selectorOfTheFieldLastName).should('have.value', valueOfTheMandatoryFieldSobrenome)
    cy.get(selectorOfTheFieldLastName).clear()
    cy.get(selectorOfTheFieldLastName).should('be.empty')
    cy.get(selectorOfTheFieldEmail).should('be.visible')
    cy.get(selectorOfTheFieldEmail).type(valueOfTheMandatoryFieldEmail)
    cy.get(selectorOfTheFieldEmail).should('have.value', valueOfTheMandatoryFieldEmail)
    cy.get(selectorOfTheFieldEmail).clear()
    cy.get(selectorOfTheFieldEmail).should('be.empty')
    cy.get(selectorOfTheFieldFeedback).should('be.visible')
    cy.get(selectorOfTheFieldFeedback).type(valueOfTheMandatoryFieldFeedback)
    cy.get(selectorOfTheFieldFeedback).should('have.value', valueOfTheMandatoryFieldFeedback)
    cy.get(selectorOfTheFieldFeedback).clear()
    cy.get(selectorOfTheFieldFeedback).should('be.empty')
  })

  it('exibir mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
    const selectorOfTheButtonEnviar = '#white-background > form > button'
    const errorMessageBoxElementClass = '.error'
    cy.get(selectorOfTheButtonEnviar).click()
    cy.get(errorMessageBoxElementClass).should('be.visible')
  })

})