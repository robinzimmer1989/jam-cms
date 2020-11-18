import axios from 'axios'

export const signIn = async ({ username, password }) => {
  try {
    const result = await axios.post(`${process.env.GATSBY_CMS_SOURCE}/wp-json/jwt-auth/v1/token`, {
      username,
      password,
    })

    const { data } = result

    return data
  } catch (err) {
    console.log(err)
  }
}

export const resetPassword = async ({ email }) => {}
