import { authServices } from '../services'
import { auth } from '../utils'

export const signIn = async ({ username, password }, dispatch) => {
  const result = await authServices.signIn({ username, password })

  if (result?.data?.token) {
    auth.setUser(result.data)
  }

  return result
}

export const signOut = async ({ callback }, dispatch) => {
  auth.logout(callback)

  dispatch({ type: `REMOVE_AUTH_USER` })
}

export const resetPassword = async ({ email }, dispatch) => {
  const result = await authServices.signIn({ email })

  return result
}
