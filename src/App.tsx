import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { PostList, Login, Join, Posting, Detail, Mypage, Redirect, Nav } from './components'

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div className='w-full pt-12 lg:pt-16 flex justify-center'>
        <Routes>
          {/* public */}
          <Route path='/' element={<PostList />} />
          <Route path='/post' element={<Detail />} />
          <Route
            path='/login'
            element={
              <Redirect type='public'>
                <Login />
              </Redirect>
            }
          />
          <Route
            path='/join'
            element={
              <Redirect type='public'>
                <Join />
              </Redirect>
            }
          />

          {/* private */}
          <Route
            path='/posting'
            element={
              <Redirect type='private'>
                <Posting />
              </Redirect>
            }
          />

          <Route
            path='/mypage'
            element={
              <Redirect type='private'>
                <Mypage />
              </Redirect>
            }
          />

          <Route
            path='/modify/:id'
            element={
              <Redirect type='private'>
                <Posting />
              </Redirect>
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
