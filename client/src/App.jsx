import React, { useContext } from 'react'
import Admin from './Admin'
import User from './User'
import GuestUser from './Guestuser'
import { GlobalContext } from './context/context'
import { decodeToken } from 'react-jwt'
export const AppRoute = '/'

const ComponentByRoles = {
  'admin': Admin,
  'user': User,
  'guestuser': GuestUser
}

const getUserRole = (params) => ComponentByRoles[params] || ComponentByRoles['guestuser']

export default function App() {
  const { state, dispatch } = useContext(GlobalContext)

  const decodeUser = (token) => {
    if (!token) {
      return undefined
    }
    else {
      const res = decodeToken(token)
      return res?.role
    }
  }

  const currentToken = decodeUser(state.token)
  const CurrentUser = getUserRole(currentToken)
  return <CurrentUser />
}