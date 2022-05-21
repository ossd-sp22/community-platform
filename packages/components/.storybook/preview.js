import { ThemeProvider } from 'theme-ui'
import { addDecorator } from '@storybook/react'
import { withThemes } from '@react-theming/storybook-addon'

import { Global } from '@emotion/react'
import { GlobalStyle } from '../../../src/themes/app.globalStyles'

import preciousPlasticTheme from '../../../src/themes/precious-plastic/styles'
import projectKampTheme from '../../../src/themes/project-kamp/styles'
import fixingFashionTheme from '../../../src/themes/fixing-fashion/styles'

import { MemoryRouter } from 'react-router-dom'

// pass ThemeProvider and array of your themes to decorator
addDecorator(
  withThemes(ThemeProvider, [
    preciousPlasticTheme,
    projectKampTheme,
    fixingFashionTheme,
  ]),
)

addDecorator((story) => {
  return (
    <>
      <Global styles={GlobalStyle} />
      <MemoryRouter>{story()}</MemoryRouter>
    </>
  )
})

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}
