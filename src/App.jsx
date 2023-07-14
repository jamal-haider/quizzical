import './App.scss'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import StartQuiz from './pages/StartQuiz/StartQuiz'
import Questions from './pages/Questions/Questions'
import Layout from './components/Layout'
import NotFound from './pages/NotFound/NoutFound'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<StartQuiz />} />
            <Route path="questions" element={<Questions />} />
            <Route path="questions" element={<Questions />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
