import axios from 'axios'
import { navigate } from 'gatsby'

import { auth } from '../utils'
import getRoute from '../routes'

const db = async (endpoint, params) => {
  const user = auth.getUser()

  if (!user?.token) {
    auth.logout(() => navigate(getRoute(`sign-in`)))
  }

  try {
    const formData = new FormData()
    Object.keys(params).map((key) => typeof params[key] !== 'undefined' && formData.append(key, params[key]))

    const url = process.env.GATSBY_CMS_SOURCE

    const result = await axios.post(`${url.replace(/\/+$/, '')}/${endpoint}`, formData, {
      headers: {
        'Content-Type': 'x-www-form-urlencoded',
        Authorization: `Bearer ${user.token}`,
      },
    })

    const { data, status } = result

    if (status === 200) {
      return data
    } else {
      auth.logout(() => navigate(getRoute(`sign-in`)))
      return false
    }
  } catch (err) {
    console.log(err)
  }
}

export default db
