import React from 'react'
import Nav from './components/layouts/nav'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import PostList from './components/pages/postList'
import Login from './components/pages/login'
import Join from './components/pages/join'
import Posting from './components/pages/posting'
import Detail from './components/pages/detail'
import Mypage from './components/pages/mypage'
import Redirect from './components/route/redirect'

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div className='w-full pt-12'>
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
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
