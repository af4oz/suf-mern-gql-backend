import { ReactNode, useEffect, useReducer } from 'react'
import createCtx from '../utils/createCtx'
import storage from '../utils/localStorage'

interface IAuthContext {
  user: any
  setUser: (userData: any) => void
  logoutUser: () => void
}
const [useAuthCtx, AuthCtxProvider] = createCtx<IAuthContext>()

const authReducer = (state: any, action: any) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        user: action.payload,
      }
    case 'LOGOUT':
      return {
        ...state,
        user: null,
      }
    default:
      return state
  }
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(authReducer, { user: null })

  useEffect(() => {
    const loggedUser = storage.loadUser()

    if (loggedUser) {
      dispatch({
        type: 'LOGIN',
        payload: loggedUser,
      })
    }
  }, [])

  const setUser: IAuthContext['setUser'] = (userData) => {
    storage.saveUser(userData)
    dispatch({
      type: 'LOGIN',
      payload: userData,
    })
  }

  const logoutUser = () => {
    storage.removeUser()
    dispatch({ type: 'LOGOUT' })
  }

  return (
    <AuthCtxProvider value={{ user: state.user, setUser, logoutUser }}>
      {children}
    </AuthCtxProvider>
  )
}

export const useAuthContext = useAuthCtx
