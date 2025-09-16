import { BrowserRouter, Route, Router, Routes } from 'react-router-dom'
import PaginaPrincipal from './Page/PaginaPrincipal/PaginaPrincipal'

function App() {

  return (
    <>
     <BrowserRouter>
      <Routes>
        <Route path='/' element={<PaginaPrincipal />}/>
      </Routes>
     </BrowserRouter>
    </>
  )
}

export default App
