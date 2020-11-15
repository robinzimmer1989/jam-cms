import axios from 'axios'
import { navigate } from 'gatsby'

import { auth } from '../utils'

const db = async (endpoint, params) => {
  const user = auth.getUser()

  if (!user?.token) {
    auth.logout(() => navigate(`/`))
  }

  try {
    const formData = new FormData()
    Object.keys(params).map((key) => formData.append(key, params[key]))

    const result = await axios.post(
      `${process.env.GATSBY_CMS_SOURCE}/wp-json/gcms/v1/${endpoint}`,
      formData,

      {
        headers: {
          'Content-Type': 'x-www-form-urlencoded',
          Authorization: `Bearer ${user.token}`,
        },
      }
    )

    const { data, status } = result

    if (status === 200) {
      return data
    }

    if (status === 403) {
      // navigate(`/`)
    }

    return false
  } catch (err) {
    console.log(err)
  }
}

export default db
