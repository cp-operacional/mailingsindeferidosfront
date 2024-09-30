import { createGlobalStyle } from 'styled-components'

export const breakpoints = {
  desktop: '1023px',
  tablet: '767px'
}

export const GlobalStyle = createGlobalStyle`
  * {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: Inter, satoshi;
  list-style: none;
  text-decoration: none;
  }

  body {
    background-color: #f0f0f0;
  }

  .container {
    margin: 0 auto;
    max-width: 1200px;

    @media (max-width: ${breakpoints.desktop}) {
      max-width: 80%;
    }
  }
`
