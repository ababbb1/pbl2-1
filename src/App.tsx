import React from 'react'
import Nav from './components/layouts/nav'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import PostList from './components/pages/postList'
import Login from './components/pages/login'
import Join from './components/pages/join'
import Posting from './components/pages/posting'
import Detail from './components/pages/detail'

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div className='w-full pt-12'>
        <Routes>
          <Route path='/' element={<PostList />} />
          <Route path='/login' element={<Login />} />
          <Route path='/join' element={<Join />} />
          <Route path='/posting' element={<Posting />} />
          <Route path='/post' element={<Detail />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
