import { Routes, Route } from 'react-router-dom'
import SubmissionPage from './pages/SubmissionPage'
import DisplayPage from './pages/DisplayPage'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<SubmissionPage />} />
      <Route path="/feedback" element={<DisplayPage />} />
    </Routes>
  )
}
