const { faker } = require('@faker-js/faker')
const Client = require('../support/Client')

describe('Central de Atendimento ao Cliente TAT', () => {

  const cacTatUrl = 'https://cac-tat-v3.s3.eu-central-1.amazonaws.com/index.html'
  const catTatTitle = 'Central de Atendimento ao Cliente TAT'
  const idOfTheFieldName = '#firstName'
  const idOfTheFieldLastName = '#lastName'
  const idOfTheFieldEmail = '#email'
  const idOfTheFieldFeedback = '#open-text-area'
  const idOfTheFieldTelephone = '#phone'
  const classOfTheSubmitButton = '.button'
  const contentOfTheSubmitButton = 'Enviar'
  const idOfTheCheckboxOfTheTelephone = '#phone-checkbox'
  const classOfTheSuccessMessage = '.success'
  const classOfTheErrorMessage = '.error'
  const client = new Client()

  beforeEach(() => {
    cy.visit(cacTatUrl)
    client.firstName = faker.person.firstName()
    client.lastName = faker.person.lastName()
    client.email = faker.internet.email({ firstName: client.firstName, lastName: client.lastName })
    client.telephone = faker.number.int({ min: 1000000000, max: 9999999999 }) 
    client.feedback = faker.lorem.words(5)
  })

  it('check the application title', () => {
    cy.title().should('be.equal', catTatTitle)
  })

  it('fill in the required fields and submit the form', () => {
    cy.gui_fillMandatoryFieldsAndSubmit(idOfTheFieldName, idOfTheFieldLastName, idOfTheFieldEmail, idOfTheFieldFeedback, classOfTheSubmitButton, contentOfTheSubmitButton, client)
    cy.get(classOfTheSuccessMessage).should('be.visible')
  })

  it('display an error message when submitting the form with an invalid email format', () => {
    client.email = `${client.firstName}.${client.lastName}#gmail.@br`
    cy.get(idOfTheFieldName).should('be.visible')
    cy.get(idOfTheFieldName).type(client.firstName)
    cy.get(idOfTheFieldName).should('have.value', client.firstName)
    cy.get(idOfTheFieldLastName).should('be.visible')
    cy.get(idOfTheFieldLastName).type(client.lastName)
    cy.get(idOfTheFieldLastName).should('have.value', client.lastName)
    cy.get(idOfTheFieldEmail).should('be.visible')
    cy.get(idOfTheFieldEmail).type(client.email)
    cy.get(idOfTheFieldEmail).should('have.value', client.email)
    cy.get(idOfTheFieldFeedback).should('be.visible')
    cy.get(idOfTheFieldFeedback).type(client.feedback)
    cy.get(idOfTheFieldFeedback).should('have.value', client.feedback)
    cy.contains(classOfTheSubmitButton, contentOfTheSubmitButton).click()
    cy.get(classOfTheErrorMessage).should('be.visible')
  })

  it('fill in the Telephone field with a non-numeric value', () => {
    client.telephone = 'one two six six'
    cy.get(idOfTheFieldTelephone).should('be.visible')
    cy.get(idOfTheFieldTelephone).type(client.telephone)
    cy.get(idOfTheFieldTelephone).should('be.empty')
  })

  it.only('display an error message when the Telephone field becomes required but is not filled in before submitting the form', () => {
    cy.gui_fillMandatoryFieldsAndSubmit(idOfTheFieldName, idOfTheFieldLastName, idOfTheFieldEmail, idOfTheFieldFeedback, classOfTheSubmitButton, contentOfTheSubmitButton, client)
    cy.get(idOfTheCheckboxOfTheTelephone).click()
    cy.contains(classOfTheSubmitButton, contentOfTheSubmitButton).click()
    cy.get(classOfTheErrorMessage).should('be.visible')
  }) 

  it('fill in and clear the Name, Lastname, Email, and Telephone fields', () => {
    cy.get(idOfTheFieldName).should('be.visible')
    cy.get(idOfTheFieldName).type(client.firstName)
    cy.get(idOfTheFieldName).should('have.value', client.firstName)
    cy.get(idOfTheFieldName).clear()
    cy.get(idOfTheFieldName).should('be.empty')
    cy.get(idOfTheFieldLastName).should('be.visible')
    cy.get(idOfTheFieldLastName).type(client.lastName)
    cy.get(idOfTheFieldLastName).should('have.value', client.lastName)
    cy.get(idOfTheFieldLastName).clear()
    cy.get(idOfTheFieldLastName).should('be.empty')
    cy.get(idOfTheFieldEmail).should('be.visible')
    cy.get(idOfTheFieldEmail).type(client.email)
    cy.get(idOfTheFieldEmail).should('have.value', client.email)
    cy.get(idOfTheFieldEmail).clear()
    cy.get(idOfTheFieldEmail).should('be.empty')
    cy.get(idOfTheFieldTelephone).should('be.visible')
    cy.get(idOfTheFieldTelephone).type(client.telephone)
    cy.get(idOfTheFieldTelephone).should('have.value', client.telephone)
    cy.get(idOfTheFieldTelephone).clear()
    cy.get(idOfTheFieldTelephone).should('be.empty')
    cy.get(idOfTheFieldFeedback).should('be.visible')
    cy.get(idOfTheFieldFeedback).type(client.feedback)
    cy.get(idOfTheFieldFeedback).should('have.value', client.feedback)
    cy.get(idOfTheFieldFeedback).clear()
    cy.get(idOfTheFieldFeedback).should('be.empty')
  })

  it('display an error message when submitting the form without filling in the required fields', () => {
    cy.contains(classOfTheSubmitButton, contentOfTheSubmitButton).click()
    cy.get(classOfTheErrorMessage).should('be.visible')
  })

})