import React from 'react'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'

import Home from './pages/home/Home.jsx'
import About from './pages/about/About.jsx'
import Books from './pages/books/Books.jsx'

import Navbar from './components/Navbar.jsx'
import SingleBook from './pages/books/SingleBook.jsx'
import AddBookForm from './pages/books/AddBookForm.jsx'
import EditBook from './pages/books/EditBook.jsx'

const App = () => {
  return (
    <main className='bg-slate-200 my-16 sm:my-32 mx-8 sm:mx-16 p-8 rounded-xl'>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/books' element={<Books />}/>
          <Route path='/book/:slug' element={<SingleBook />}/>
          <Route path='/add-book' element={<AddBookForm />}/>
          <Route path='/edit-book/:slug' element={<EditBook />}/>
          <Route path='/about' element={<About />}/>
        </Routes>
      </Router>
    </main>
  )
}

export default App
