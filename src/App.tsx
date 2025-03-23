import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import TypingGame from './components/typingGame'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>

        <TypingGame/>


       </div>
    </>
  )
}

export default App
