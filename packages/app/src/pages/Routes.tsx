import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuthContext } from '../context/auth'

import 'twin.macro'
import { lazy, Suspense } from 'react'
import MainLayout from '~~/components/Layout/MainLayout'

const QuesList = lazy(() => import('./QuesList'))
const AllTags = lazy(() => import('./AllTags'))
const AllUsers = lazy(() => import('./AllUsers'))
const User = lazy(() => import('./User'))
const Question = lazy(() => import('./Question'))
const AskQuestion = lazy(() => import('./AskQuestion'))
const RightSidePanel = lazy(() => import('../components/Layout/RightSidePanel'))
const NotFound = lazy(() => import('./NotFound'))

const AppRoutes = () => {
  const { user } = useAuthContext()

  return (
    <MainLayout>
      <Suspense fallback={<div>loading...</div>}>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <QuesList />
                <RightSidePanel />
              </>
            }
          />
          <Route
            path="/ask"
            element={
              user ? (
                <>
                  <AskQuestion />
                  <RightSidePanel />
                </>
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route path="/tags" element={<AllTags />} />
          <Route path="/users" element={<AllUsers />} />
          <Route path="/user/:username" element={<User />} />
          <Route
            path="/questions/:quesId"
            element={
              <>
                <Question />
                <RightSidePanel />
              </>
            }
          ></Route>
          <Route
            path="/tags/:tagName"
            element={
              <>
                <QuesList tagFilterActive={true} />
                <RightSidePanel />
              </>
            }
          ></Route>
          <Route
            path="/search/:query"
            element={
              <>
                <QuesList searchFilterActive={true} />
                <RightSidePanel />
              </>
            }
          ></Route>
          <Route
            element={
              <>
                <NotFound />
                <RightSidePanel />
              </>
            }
          ></Route>
        </Routes>
      </Suspense>
    </MainLayout>
  )
}

export default AppRoutes
