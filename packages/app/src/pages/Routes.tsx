import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuthContext } from '../context/auth'

import 'twin.macro'
import { lazy, Suspense } from 'react'

const QuesList = lazy(() => import('./QuesList'))
const AllTags = lazy(() => import('./AllTags'))
const AllUsers = lazy(() => import('./AllUsers'))
const User = lazy(() => import('./User'))
const Question = lazy(() => import('./Question'))
const AskQuestion = lazy(() => import('./AskQuestion'))
const RightSidePanel = lazy(() => import('../components/Layout/RightSidePanel'))
const NavMenuDesktop = lazy(() => import('../components/Navs/NavMenuDesktop'))
const NotFound = lazy(() => import('./NotFound'))

const AppRoutes = () => {
  const { user } = useAuthContext()

  return (
    <div tw="max-width[1264px] w-full mx-auto flex flex-row flex-nowrap relative">
      <Suspense fallback={<div>loading...</div>}>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <NavMenuDesktop />
                <QuesList />
                <RightSidePanel />
              </>
            }
          ></Route>
          <Route path="/ask">
            {user ? (
              <>
                <NavMenuDesktop />
                <AskQuestion />
                <RightSidePanel />
              </>
            ) : (
              <Navigate to="/" />
            )}
          </Route>

          <Route path="/tags">
            <NavMenuDesktop />
            <AllTags />
          </Route>
          <Route path="/users">
            <NavMenuDesktop />
            <AllUsers />
          </Route>
          <Route path="/user/:username">
            <NavMenuDesktop />
            <User />
          </Route>
          <Route path="/questions/:quesId">
            <NavMenuDesktop />
            <Question />
            <RightSidePanel />
          </Route>
          <Route path="/tags/:tagName">
            <NavMenuDesktop />
            <QuesList tagFilterActive={true} />
            <RightSidePanel />
          </Route>
          <Route path="/search/:query">
            <NavMenuDesktop />
            <QuesList searchFilterActive={true} />
            <RightSidePanel />
          </Route>
          <Route>
            <NavMenuDesktop />
            <NotFound />
            <RightSidePanel />
          </Route>
        </Routes>
      </Suspense>
    </div>
  )
}

export default AppRoutes
