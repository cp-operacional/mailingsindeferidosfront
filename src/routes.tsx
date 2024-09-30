import { Routes, Route } from 'react-router-dom'

import Home from './pages/Home'
import IndeferidosCount from './pages/ IndeferidosCount'

const PageRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/indeferidos-count" element={<IndeferidosCount />} />
    </Routes>
  )
}

export default PageRoutes
