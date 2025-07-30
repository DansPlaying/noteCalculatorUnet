// https://on.cypress.io/api

describe('Calculator UNET', () => {
  it('Visit the app root url', () => {
    cy.visit('http://localhost:5173')
    cy.contains('CALCULADORA NOTAS UNET')
  })

  it('Convert 100 to 9', () => {
    cy.visit('http://localhost:5173')
    cy.get('#100').clear()
    cy.get('#100').type('60')
    cy.get('#calcular100').click()
    cy.contains('Equivalente a 5.8 puntos.').should('be.visible')
  })

  it('Convert 100 to 9', () => {
    cy.visit('http://localhost:5173')
    cy.get('#9').clear()
    cy.get('#9').type('4.5')
    cy.get('#calcular9').click()
    cy.contains('Equivalente a 45 puntos.').should('be.visible')
  })

  it('Theme change', () => {
    cy.visit('http://localhost:5173')

    cy.get('html').should('not.have.class', 'dark')
    cy.get('#theme-toggle').click()
    cy.get('html').should('have.class', 'dark')
    cy.get('#theme-toggle span').should('contain', 'Modo Claro')

    cy.get('#theme-toggle').click()
    cy.get('html').should('not.have.class', 'dark')
    cy.get('#theme-toggle span').should('contain', 'Modo Oscuro')
  })

  it('Calculate note', () => {
    cy.visit('http://localhost:5173')

    cy.get('#notes').select('2')
    const porcentajes = [30, 35]
    const notas100 = [70, 80]

    porcentajes.forEach((pct, index) => {
      cy.get(`#percent${index}`).clear()
      cy.get(`#percent${index}`).type(pct.toString())
      cy.get(`#note${index}`).clear()
      cy.get(`#note${index}`).type(notas100[index].toString())
    })

    cy.contains('Nota acumulada:').should('be.visible')
    cy.get('h3').should('contain.text', 'Nota acumulada:')

    cy.get('#totalRequired').should('be.visible')
  })
})
