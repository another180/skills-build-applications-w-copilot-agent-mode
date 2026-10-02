import { Route, Routes } from 'react-router-dom'
import './App.css'

function App() {
  return (
    <main className="container py-5">
      <Routes>
        <Route
          path="*"
          element={
            <section>
              <p className="text-uppercase text-secondary mb-2">OctoFit Tracker</p>
              <h1 className="display-5">Your activity hub</h1>
              <p className="lead">Track movement, train with your team, and keep your goals in view.</p>
            </section>
          }
        />
      </Routes>
    </main>
  )
}

export default App
