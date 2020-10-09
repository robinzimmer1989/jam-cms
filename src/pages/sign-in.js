import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { navigate } from '@reach/router'
import { Auth } from 'aws-amplify'
import { Button, Card } from 'antd'

// import app components
import Input from 'components/Input'
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
    loading: false,
  })

  const isAuthed = isLoggedIn()

  useEffect(() => {
    isAuthed && navigate(getRoute(`app`))
  }, [isAuthed])

  const handleLogin = async () => {
    const { username, password } = data

    if (!username || !password) {
      return
    }

    handleChange({ target: { name: 'loading', value: true } })

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
      handleChange({ target: { name: 'error', value: err } })
      console.log('error...: ', err)
    }

    handleChange({ target: { name: 'loading', value: true } })
  }

  const handleChange = e => setData({ ...data, [e.target.name]: e.target.value })

  return (
    <BaseLayout>
      <Edges size="xs">
        <Spacer mt={30} mb={30}>
          <Card title={`Sign In`}>
            <Spacer mb={20}>
              <Input label={`Username`} value={data.username} onChange={handleChange} name="username" />
            </Spacer>

            <Spacer mb={20}>
              <Input label={`Password`} value={data.password} type="password" onChange={handleChange} name="password" />
            </Spacer>

            <Button loading={data.loading} children={`Submit`} onClick={handleLogin} type="primary" />

            {data?.error?.message && <Error errorMessage={data.error} />}
          </Card>
        </Spacer>
      </Edges>
    </BaseLayout>
  )
}

const Error = styled.div``

export default SignIn
