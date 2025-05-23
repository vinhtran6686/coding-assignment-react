/* eslint-disable react-refresh/only-export-components */
import { FC, useState, useEffect, createContext, useContext, Dispatch, SetStateAction } from 'react'
import { LayoutSplashScreen } from 'client/src/app/core/layout/core'
import { AuthModel, UserModel } from './_models'
import * as authHelper from './AuthHelpers'
import { getUserByToken } from './_requests' 
import { WithChildren } from 'client/src/app/core/utils'

type AuthContextProps = {
  auth: AuthModel | undefined
  saveAuth: (auth: AuthModel | undefined) => void
  currentUser: UserModel | undefined
  setCurrentUser: Dispatch<SetStateAction<UserModel | undefined>>
  logout: () => void
}

const initAuthContextPropsState = {
  auth: authHelper.getAuth(),
  saveAuth: () => { },
  currentUser: undefined,
  setCurrentUser: () => { },
  logout: () => { },
}

const AuthContext = createContext<AuthContextProps>(initAuthContextPropsState)

const useAuth = () => {
  return useContext(AuthContext)
}

const AuthProvider: FC<WithChildren> = ({ children }) => {
  const [auth, setAuth] = useState<AuthModel | undefined>(authHelper.getAuth())
  const [currentUser, setCurrentUser] = useState<UserModel | undefined>()
  const saveAuth = (auth: AuthModel | undefined) => {
    setAuth(auth)
    if (auth) {
      authHelper.setAuth(auth)
    } else {
      authHelper.removeAuth()
    }
  }

  const logout = () => {
    saveAuth(undefined)
    setCurrentUser(undefined)
  }

  return (
    <AuthContext.Provider value={{ auth, saveAuth, currentUser, setCurrentUser, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

const AuthInit: FC<WithChildren> = ({ children }) => {
  const { auth, currentUser, logout, setCurrentUser } = useAuth()
  const [showSplashScreen, setShowSplashScreen] = useState(true)
 
  useEffect(() => {
    const requestUser = async (apiToken: string) => {
      console.log('requestUser', apiToken)
      try {
        if (!currentUser) {
          const { data } = await getUserByToken(apiToken)
          console.log('data', data)
          if (data) {
            setCurrentUser(data)
          }
        }
      } catch (error) {
        console.error(error)
        if (currentUser) {
          logout()
        }
      } finally {
        setShowSplashScreen(false)
      }
    }

    if (auth && auth.api_token) {
      requestUser(auth.api_token)
    } else {
      logout()
      setShowSplashScreen(false)
    }
    // eslint-disable-next-line
  }, [])

  return showSplashScreen ? <LayoutSplashScreen /> : <>{children}</>
}

export { AuthProvider, AuthInit, useAuth }
