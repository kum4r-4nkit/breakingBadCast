import React, { useState, useEffect } from 'react';
import logo from './logo.png'
import axios from 'axios';
import Spinner from './spinner.gif'
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
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
      <Box
        component="form"
        sx={{
          margin: 'auto',
          marginTop: 2,
          marginBottom: 6,
          maxWidth: 600,
          backgroundColor: '#e8f5e9',
          '&:hover': {
            backgroundColor: '#ffffff'
          },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField fullWidth id="filled-basic" variant="filled" label="Search characters" value={query}
          onChange={(e) => setQuery(e.target.value)} autoFocus />
      </Box>
      {isLoading ? (
        <img src={Spinner}
          style={{ width: '120px', margin: 'auto', display: 'block' }}
          alt='Loading'
        />
      ) : (
        <section className='cards'>
          {items.map((item, i) => (
            <div key={i}>
              <a href={`https://en.wikipedia.org/wiki/${item.name}_(Breaking_Bad)`} target="_blank" rel="noreferrer">
                <Card sx={{ maxWidth: 345 }}>
                  <CardMedia
                    component="img"
                    alt="green iguana"
                    height="300"
                    image={item.img}
                  />
                </Card>
              </a>
            </div>
          ))}
        </section>
      )}
    </div>
  )
}
export default App
