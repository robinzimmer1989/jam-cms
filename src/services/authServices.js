import axios from 'axios'

export const signIn = async ({ username, password }) => {
  try {
    const result = await axios.post(`${process.env.GATSBY_CMS_SOURCE}/wp-json/jwt-auth/v1/token`, {
      username,
      password,
    })

    const { data, status } = result

    if (status === 200 && data?.data?.token) {
      return data.data
    }

    return false
  } catch (err) {
    console.log(err)
  }
}

export const resetPassword = async ({ email }) => {}
