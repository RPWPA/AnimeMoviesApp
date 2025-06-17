import { useState } from 'react'
import './App.css'
import Search from './components/search/search'

function App() {
  const [searchTerm, setSearchTerm] = useState<string>("");

  return (
    <main>
    <div className="pattern"></div>
    <div className="wrapper">
      <header>
        <img src="./hero.png" alt='hero image' />
        <h1>Find your favorite <span className='text-gradient'>movies</span></h1>
      </header>
      <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
      <h1>{searchTerm}</h1>
    </div>
    </main>
  )
}

export default App
