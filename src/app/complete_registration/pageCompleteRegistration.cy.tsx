import React from 'react'
import CompleteRegistration from './page'

describe('<CompleteRegistration />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<CompleteRegistration />)
  })
})