import React from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Nav from './components/layouts/nav'
import PostCardModal from './components/layouts/postCardModal'
import Detail from './components/pages/detail'
import Join from './components/pages/join'
import Login from './components/pages/login'
import Mypage from './components/pages/mypage'
import Posting from './components/pages/posting'
import PostList from './components/pages/postList'
import Redirect from './components/route/redirect'
import { cls } from './functions/utils'

function App() {
  const location: any = useLocation()
  const background = location.state && location.state.background

  return (
    <>
      <div className='pt-12 lg:pt-16 w-full flex justify-center'>
      <Nav />
        <Routes location={background || location}>
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
        {background && (
        <Routes>
          <Route
              path='/detail/:id'
              element={
                <PostCardModal item={location.state.item} />
              }
            />
        </Routes>
      )}
      </div>
    </>
  )
}

export default App
