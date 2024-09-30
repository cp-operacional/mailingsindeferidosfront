import { BrowserRouter } from 'react-router-dom'

import PageRoutes from './routes'

import { GlobalStyle } from './styles'

function App() {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <PageRoutes />
    </BrowserRouter>
  )
}

export default App
