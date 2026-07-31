import { Navigate, Route, Routes } from 'react-router-dom'
import MainLayout from './components/layout/MainLayout'
import CandidateFormPage from './pages/CandidateFormPage'
import CandidateProfilePage from './pages/CandidateProfilePage'
import CandidatesPage from './pages/CandidatesPage'

export default function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Navigate to="/candidates" replace />} />
        <Route path="/candidates" element={<CandidatesPage />} />
        <Route path="/candidates/new" element={<CandidateFormPage />} />
        <Route path="/candidates/:id" element={<CandidateProfilePage />} />
        <Route path="/candidates/:id/edit" element={<CandidateFormPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/candidates" replace />} />
    </Routes>
  )
}
