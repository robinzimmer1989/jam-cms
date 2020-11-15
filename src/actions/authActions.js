import { authServices } from '../services'
import { auth } from '../utils'

export const signIn = async ({ username, password }, dispatch) => {
  const result = await authServices.signIn({ username, password })

  if (result) {
    auth.setUser(result)
  }

  return result
}

export const signOut = async ({ callback }, dispatch) => {
  auth.logout(callback)
}

export const resetPassword = async ({ email }, dispatch) => {
  const result = await authServices.signIn({ email })

  return result
}