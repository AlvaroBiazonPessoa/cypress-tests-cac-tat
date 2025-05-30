Cypress.Commands.add('gui_fillMandatoryFields', (nameFieldSelector, lastNameFieldSelector, emailFieldSelector, feedbackFieldSelector, client) => {
    cy.get(nameFieldSelector).should('be.visible')
    cy.get(nameFieldSelector).type(client.firstName)
    cy.get(nameFieldSelector).should('have.value', client.firstName)
    cy.get(lastNameFieldSelector).should('be.visible')
    cy.get(lastNameFieldSelector).type(client.lastName)
    cy.get(lastNameFieldSelector).should('have.value', client.lastName)
    cy.get(emailFieldSelector).should('be.visible')
    cy.get(emailFieldSelector).type(client.email)
    cy.get(emailFieldSelector).should('have.value', client.email)
    cy.get(feedbackFieldSelector).should('be.visible')
    cy.get(feedbackFieldSelector).type(client.feedback)
    cy.get(feedbackFieldSelector).should('have.value', client.feedback)
})

Cypress.Commands.add('gui_addAnAttachment', (addAnAttachmentFieldSelector, pathToFile, fileName, action) => {
    cy.get(addAnAttachmentFieldSelector).should('be.visible')
    cy.get(addAnAttachmentFieldSelector).selectFile(pathToFile + fileName, { action: action })
})