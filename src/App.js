import React, { useState, useEffect } from 'react';
import logo from './logo.png'
import axios from 'axios';
import Spinner from './spinner.gif'
import './App.css';

const App = () => {
  const [items, setItems] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [query, setQuery] = useState('')

  useEffect(() => {
    const fetchItems = async () => {
      setIsLoading(true)
      const result = await axios(`https://www.breakingbadapi.com/api/characters?name=${query}`)
      setItems(result.data)
      setIsLoading(false)
    }
    fetchItems()
  }, [query])

  return (
    <div className='container'>
      <header className='center'>
        <img src={logo} alt="" />
      </header>
      <input
        type='text' className='form-control' placeholder='Search characters' value={query}
        onChange={(e) => setQuery(e.target.value)} autoFocus
      />
      {isLoading ? (
        <img src={Spinner}
          style={{ width: '120px', margin: 'auto', display: 'block' }}
          alt='Loading'
        />
      ) : (
        <section className='cards'>
          {items.map((item) => (
            <div className='card'>
              <img src={item.img} alt='' />
            </div>
          ))}
        </section>
      )}
    </div>
  )
}

export default App