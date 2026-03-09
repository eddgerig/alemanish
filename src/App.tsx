import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Dashboard } from '@Pages/Dashboard'
import { LessonFlow } from '@Pages/LessonFlow'
import { LessonCompleted } from '@Pages/LessonCompleted'
import { UserProvider } from './context/UserContext'
import './App.css'

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/lesson/:moduleId" element={<LessonFlow />} />
          <Route path="/completed" element={<LessonCompleted />} />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  )
}

export default App

