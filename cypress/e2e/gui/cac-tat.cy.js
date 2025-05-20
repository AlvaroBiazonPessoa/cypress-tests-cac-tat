const { faker } = require('@faker-js/faker')
const Client = require('../../support/Client')

describe('Central de Atendimento ao Cliente TAT', () => {
  
  const nameFieldSelector = 'input[id="firstName"]'
  const lastNameFieldSelector = 'input#lastName'
  const emailFieldSelector = '#email'
  const feedbackFieldSelector = 'textarea[id="open-text-area"]'
  const telephoneFieldSelector = 'input[id="phone"]'
  const submitButtonSelector = 'button[class="button"]'
  const contentOfTheSubmitButton = 'Enviar'
  const productFieldSelector = 'select[id="product"]'
  const addAnAttachmentFieldSelector = 'input[type=file][id="file-upload"]'
  const pathToFile = 'cypress/fixtures/' 
  const successMessageSelector = 'span[class="success"]'
  const errorMessageSelector = 'span[class="error"]'
  const privacyPolicyLinkSelector = 'a[href="privacy.html"]'
  const client = new Client()

  beforeEach(() => {
    const resource = '/index.html'
    cy.visit(resource)
    client.firstName = faker.person.firstName()
    client.lastName = faker.person.lastName()
    client.email = faker.internet.email({ firstName: client.firstName, lastName: client.lastName })
    client.telephone = faker.number.int({ min: 1000000000, max: 9999999999 }) 
    client.feedback = faker.lorem.words(5)
  })

  it('check the application title', () => {
    const catTatTitle = 'Central de Atendimento ao Cliente TAT'
    cy.title().should('be.equal', catTatTitle)
  })

  it('fill in the required fields and submit the form', () => {
    cy.gui_fillMandatoryFields(nameFieldSelector, lastNameFieldSelector, emailFieldSelector, feedbackFieldSelector, client)
    cy.contains(submitButtonSelector, contentOfTheSubmitButton).click()
    cy.get(successMessageSelector).should('be.visible')
  })

  it('display an error message when submitting the form with an invalid email format', () => {
    client.email = `${client.firstName}.${client.lastName}#gmail.@br`
    cy.gui_fillMandatoryFields(nameFieldSelector, lastNameFieldSelector, emailFieldSelector, feedbackFieldSelector, client)
    cy.contains(submitButtonSelector, contentOfTheSubmitButton).click()
    cy.get(errorMessageSelector).should('be.visible')
  })

  it('fill in the Telephone field with a non-numeric value', () => {
    client.telephone = 'one two six six'
    cy.get(telephoneFieldSelector).should('be.visible')
    cy.get(telephoneFieldSelector).type(client.telephone)
    cy.get(telephoneFieldSelector).should('be.empty')
  })

  it('display an error message when the Telephone field becomes required but is not filled in before submitting the form', () => {
    const phoneCheckboxSelector = 'input[type="checkbox"][id="phone-checkbox"]'
    cy.gui_fillMandatoryFields(nameFieldSelector, lastNameFieldSelector, emailFieldSelector, feedbackFieldSelector, client)
    cy.get(phoneCheckboxSelector).should('be.visible')
    cy.get(phoneCheckboxSelector).check()
    cy.get(phoneCheckboxSelector).should('be.checked')
    cy.contains(submitButtonSelector, contentOfTheSubmitButton).click()
    cy.get(errorMessageSelector).should('be.visible')
  }) 

  it('fill in and clear the Name, Lastname, Email, and Telephone fields', () => {
    cy.get(nameFieldSelector).should('be.visible')
    cy.get(nameFieldSelector).type(client.firstName)
    cy.get(nameFieldSelector).should('have.value', client.firstName)
    cy.get(nameFieldSelector).clear()
    cy.get(nameFieldSelector).should('be.empty')
    cy.get(lastNameFieldSelector).should('be.visible')
    cy.get(lastNameFieldSelector).type(client.lastName)
    cy.get(lastNameFieldSelector).should('have.value', client.lastName)
    cy.get(lastNameFieldSelector).clear()
    cy.get(lastNameFieldSelector).should('be.empty')
    cy.get(emailFieldSelector).should('be.visible')
    cy.get(emailFieldSelector).type(client.email)
    cy.get(emailFieldSelector).should('have.value', client.email)
    cy.get(emailFieldSelector).clear()
    cy.get(emailFieldSelector).should('be.empty')
    cy.get(telephoneFieldSelector).should('be.visible')
    cy.get(telephoneFieldSelector).type(client.telephone)
    cy.get(telephoneFieldSelector).should('have.value', client.telephone)
    cy.get(telephoneFieldSelector).clear()
    cy.get(telephoneFieldSelector).should('be.empty')
    cy.get(feedbackFieldSelector).should('be.visible')
    cy.get(feedbackFieldSelector).type(client.feedback)
    cy.get(feedbackFieldSelector).should('have.value', client.feedback)
    cy.get(feedbackFieldSelector).clear()
    cy.get(feedbackFieldSelector).should('be.empty')
  })

  it('display an error message when submitting the form without filling in the required fields', () => {
    cy.contains(submitButtonSelector, contentOfTheSubmitButton).click()
    cy.get(errorMessageSelector).should('be.visible')
  })

  it('select a product (YouTube) by its text', () => {
    const valueOfTheTagOptionYouTube = 'youtube'
    const contentOfTheTagOptionYouTube = 'YouTube'
    cy.get(productFieldSelector).should('be.visible')
    cy.get(productFieldSelector).select(contentOfTheTagOptionYouTube).should('have.value', valueOfTheTagOptionYouTube)
  })

  it('select a product (Mentorship) by its value (value)', () => {
    const valueOfTheTagOptionMentorship = 'mentoria'
    cy.get(productFieldSelector).should('be.visible')
    cy.get(productFieldSelector).select(valueOfTheTagOptionMentorship).should('have.value', valueOfTheTagOptionMentorship)
  })

  it('select a product (Blog) by its index', () => {
    const indexOfTheTagOptionBlog = 1
    const valueOfTheTagOptionBlog = 'blog'
    cy.get(productFieldSelector).should('be.visible')
    cy.get(productFieldSelector).select(indexOfTheTagOptionBlog).should('have.value', valueOfTheTagOptionBlog)
  })

  it('mark the type of service "Feedback"', () => {
    const feedbackRadioButtonSelector = 'input[type="radio"][value="feedback"]'
    cy.get(feedbackRadioButtonSelector).should('be.visible')
    cy.get(feedbackRadioButtonSelector).check()
    cy.get(feedbackRadioButtonSelector).should('be.checked')
  })

  it('mark each type of service', () => {
    const radioInputTagSelector = 'input[type="radio"]'
    cy.get(radioInputTagSelector).should('be.visible')
    cy.get(radioInputTagSelector).each((typeOfService) => {
      cy.wrap(typeOfService).check()
      cy.wrap(typeOfService).should('be.checked')
    })
  })  

  it('mark all communication channels, then unmark the last communication channel', () => {
    const checkboxInputTagSelector = 'input[type="checkbox"]'
    cy.get(checkboxInputTagSelector).should('be.visible')
    cy.get(checkboxInputTagSelector).check()
    cy.get(checkboxInputTagSelector).should('be.checked')
    cy.get(checkboxInputTagSelector).last().uncheck()
    cy.get(checkboxInputTagSelector).last().should('not.be.checked')
  })

  it('add an attachment', () => {
    const fileName = 'just_hanging_around.jpg'
    const action = 'select'
    cy.gui_addAnAttachment(addAnAttachmentFieldSelector, pathToFile, fileName, action)
      .should(input => {
        expect(input[0].files[0].name).to.eq(fileName)
      })
  })

  it('drag and drop an attachment', () => {
    const fileName = 'lebron_james.jpg'
    const action = 'drag-drop'
    cy.gui_addAnAttachment(addAnAttachmentFieldSelector, pathToFile, fileName, action)
      .should(input => {
        expect(input[0].files[0].name).to.eq(fileName)
      })
  })

  it('access Privacy Policy without clicking', () => {
    cy.get(privacyPolicyLinkSelector).should('be.visible')
    cy.get(privacyPolicyLinkSelector).should('have.attr', 'target', '_blank')
  })

  it('access Privacy Policy by removing target attribute', () => {
    const newResource = '/privacy.html'
    const titleOfThePageSelector = 'h1[id="title"]'
    const titleOfThePage = 'CAC TAT - Política de Privacidade'
    cy.get(privacyPolicyLinkSelector).should('be.visible')
    cy.get(privacyPolicyLinkSelector).invoke('removeAttr', 'target')
    cy.get(privacyPolicyLinkSelector).should('not.have.attr', 'target')
    cy.get(privacyPolicyLinkSelector).click()
    cy.url().should('include', newResource)
    cy.get(titleOfThePageSelector).should('be.visible')
    cy.get(titleOfThePageSelector).should('have.text', titleOfThePage)
  })

})