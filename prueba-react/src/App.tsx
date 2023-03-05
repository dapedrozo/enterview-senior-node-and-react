import { useState } from 'react'
import './App.css'
import { Home } from './pages'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <Home/>
    </div>
  )
}

export default App
