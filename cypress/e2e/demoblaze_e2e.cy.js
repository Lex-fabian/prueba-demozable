describe('Flujo de compra en Demoblaze', () => {
  const productos = ['Samsung galaxy s6', 'Nokia lumia 1520'];
  const datos = {
    name: 'Juan Perez',
    country: 'Colombia',
    city: 'Bogota',
    card: '1234567890123456',
    month: '12',
    year: '2025'
  };

  it('Compra dos productos y finaliza el proceso', () => {
    cy.visit('https://www.demoblaze.com/');
    for (var i = 0; i < productos.length; i++) {
      cy.contains(productos[i]).click();
      cy.contains('Add to cart').click();
  cy.on('window:alert', function(mensaje) { expect(mensaje).to.equal('Product added'); });
  cy.wait(2000);
      if (i === 0) cy.get('.navbar-brand').click();
    }
    cy.get('#cartur').click();
    cy.url().should('include', 'cart.html');
    cy.wait(5000);
    cy.get('#tbodyid').invoke('html').then(html => {
      console.log('HTML del carrito:', html);
    });
    for (var j = 0; j < productos.length; j++) {
      cy.get('#tbodyid').should('contain.text', productos[j]);
    }
    cy.contains('Place Order').click();
    for (var campo in datos) {
      cy.get('#' + campo).type(datos[campo]);
    }
    cy.contains('Purchase').click();
    cy.get('.sweet-alert').should('be.visible');
    cy.contains('Thank you for your purchase!');
    cy.contains('OK').click();
  });
})
