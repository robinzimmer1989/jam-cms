import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { navigate } from '@reach/router'
import { Auth } from 'aws-amplify'
import { Button, Input, Card } from 'antd'

// import app components
import BaseLayout from 'components/BaseLayout'
import Spacer from 'components/Spacer'
import Edges from 'components/Edges'

import { setUser, isLoggedIn } from 'utils/auth'
import getRoute from 'routes'

const SignIn = () => {
  const [data, setData] = useState({
    username: ``,
    password: ``,
    error: ``,
  })

  const isAuthed = isLoggedIn()

  useEffect(() => {
    isAuthed && navigate(getRoute(`app`))
  }, [isAuthed])

  const handleLogin = async () => {
    const { username, password } = data

    try {
      await Auth.signIn(username, password)
      const user = await Auth.currentAuthenticatedUser()
      const userInfo = {
        ...user.attributes,
        username: user.username,
      }
      setUser(userInfo)
      navigate(getRoute(`app`))
    } catch (err) {
      setData({ ...data, error: err })
      console.log('error...: ', err)
    }
  }

  const handleChange = e => setData({ ...data, [e.target.name]: e.target.value })

  return (
    <BaseLayout>
      <Edges size="xs">
        <Spacer mt={30} mb={30}>
          <Card title={`Sign In`}>
            <Spacer mb={20}>
              <Input placeholder={`Username`} value={data.username} onChange={handleChange} name="username" />
            </Spacer>

            <Spacer mb={20}>
              <Input
                placeholder={`Password`}
                value={data.password}
                type="password"
                onChange={handleChange}
                name="password"
              />
            </Spacer>

            <Button children={`Submit`} onClick={handleLogin} type="primary" />

            {data?.error?.message && <Error errorMessage={data.error} />}
          </Card>
        </Spacer>
      </Edges>
    </BaseLayout>
  )
}

const Error = styled.div``

export default SignIn
