const { faker } = require('@faker-js/faker')
const Client = require('../support/Client')

describe('Central de Atendimento ao Cliente TAT', () => {

  const cacTatUrl = 'https://cac-tat-v3.s3.eu-central-1.amazonaws.com/index.html'
  const catTatTitle = 'Central de Atendimento ao Cliente TAT'
  const selectorOfTheFieldName = '#firstName'
  const selectorOfTheFieldLastName = '#lastName'
  const selectorOfTheFieldEmail = '#email'
  const selectorOfTheFieldFeedback = '#open-text-area'
  const selectorOfTheFieldTelephone = '#phone'
  const selectorOfTheButtonSend = '#white-background > form > button'
  const successMessageBoxElementClass = '.success'
  const errorMessageBoxElementClass = '.error'
  const client = new Client()

  beforeEach(() => {
    cy.visit(cacTatUrl)
    client.firstName = faker.person.firstName()
    client.lastName = faker.person.lastName()
    client.email = faker.internet.email({ firstName: client.firstName, lastName: client.lastName })
    client.telephone = faker.number.int({ min: 1000000000, max: 9999999999 }) 
    client.feedback = faker.lorem.words(5)
  })

  it('verificar o título da aplicação', () => {
    cy.title().should('be.equal', catTatTitle)
  })

  it('preencher os campos obrigatórios e enviar o formulário', () => {
    cy.gui_fillMandatoryFieldsAndSubmit(selectorOfTheFieldName, selectorOfTheFieldLastName, selectorOfTheFieldEmail, selectorOfTheFieldFeedback, selectorOfTheButtonSend, successMessageBoxElementClass, client)
  })

  it('exibir mensagem de erro ao submeter o formulário com um e-mail com formatação inválida', () => {
    client.email = `${client.firstName}.${client.lastName}#gmail.@br`
    cy.get(selectorOfTheFieldName).should('be.visible')
    cy.get(selectorOfTheFieldName).type(client.firstName)
    cy.get(selectorOfTheFieldName).should('have.value', client.firstName)
    cy.get(selectorOfTheFieldLastName).should('be.visible')
    cy.get(selectorOfTheFieldLastName).type(client.lastName)
    cy.get(selectorOfTheFieldLastName).should('have.value', client.lastName)
    cy.get(selectorOfTheFieldEmail).should('be.visible')
    cy.get(selectorOfTheFieldEmail).type(client.email)
    cy.get(selectorOfTheFieldEmail).should('have.value', client.email)
    cy.get(selectorOfTheFieldFeedback).should('be.visible')
    cy.get(selectorOfTheFieldFeedback).type(client.feedback)
    cy.get(selectorOfTheFieldFeedback).should('have.value', client.feedback)
    cy.get(selectorOfTheButtonSend).click()
    cy.get(errorMessageBoxElementClass).should('be.visible')
  })

  it('preencher o campo Telefone com valor não-numérico', () => {
    client.telephone = 'one two six six'
    cy.get(selectorOfTheFieldTelephone).should('be.visible')
    cy.get(selectorOfTheFieldTelephone).type(client.telephone)
    cy.get(selectorOfTheFieldTelephone).should('be.empty')
  })

  it('preencher e limpar os campos Nome, Sobrenome, E-mail e Telefone', () => {
    cy.get(selectorOfTheFieldName).should('be.visible')
    cy.get(selectorOfTheFieldName).type(client.firstName)
    cy.get(selectorOfTheFieldName).should('have.value', client.firstName)
    cy.get(selectorOfTheFieldName).clear()
    cy.get(selectorOfTheFieldName).should('be.empty')
    cy.get(selectorOfTheFieldLastName).should('be.visible')
    cy.get(selectorOfTheFieldLastName).type(client.lastName)
    cy.get(selectorOfTheFieldLastName).should('have.value', client.lastName)
    cy.get(selectorOfTheFieldLastName).clear()
    cy.get(selectorOfTheFieldLastName).should('be.empty')
    cy.get(selectorOfTheFieldEmail).should('be.visible')
    cy.get(selectorOfTheFieldEmail).type(client.email)
    cy.get(selectorOfTheFieldEmail).should('have.value', client.email)
    cy.get(selectorOfTheFieldEmail).clear()
    cy.get(selectorOfTheFieldEmail).should('be.empty')
    cy.get(selectorOfTheFieldTelephone).should('be.visible')
    cy.get(selectorOfTheFieldTelephone).type(client.telephone)
    cy.get(selectorOfTheFieldTelephone).should('have.value', client.telephone)
    cy.get(selectorOfTheFieldTelephone).clear()
    cy.get(selectorOfTheFieldTelephone).should('be.empty')
    cy.get(selectorOfTheFieldFeedback).should('be.visible')
    cy.get(selectorOfTheFieldFeedback).type(client.feedback)
    cy.get(selectorOfTheFieldFeedback).should('have.value', client.feedback)
    cy.get(selectorOfTheFieldFeedback).clear()
    cy.get(selectorOfTheFieldFeedback).should('be.empty')
  })

  it('exibir mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
    cy.get(selectorOfTheButtonSend).click()
    cy.get(errorMessageBoxElementClass).should('be.visible')
  })

})