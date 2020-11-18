import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { navigate } from 'gatsby'
import { Button, Card } from 'antd'

// import app components
import Input from './Input'
import Spacer from './Spacer'

import { authActions } from '../actions'
import getRoute from '../routes'
import { auth } from '../utils'

export default () => {
  const [data, setData] = useState({
    username: ``,
    password: ``,
    error: ``,
    loading: false,
  })

  const isAuthed = auth.isLoggedIn()

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
      const result = await authActions.signIn({ username, password })

      if (result?.success) {
        navigate(getRoute(`app`))
      } else {
        handleChange({ target: { name: 'error', value: result?.message } })
      }
    } catch (err) {
      console.log('error...: ', err)
    }
  }

  const handleChange = (e) => setData({ ...data, [e.target.name]: e.target.value })

  return (
    <Spacer mt={30} mb={30}>
      <Card title={`Sign In`}>
        <Spacer mb={20}>
          <Input label={`Username`} value={data.username} onChange={handleChange} name="username" />
        </Spacer>

        <Spacer mb={20}>
          <Input label={`Password`} value={data.password} type="password" onChange={handleChange} name="password" />
        </Spacer>

        {data?.error && (
          <Spacer mb={20}>
            <Error children={data.error} />
          </Spacer>
        )}

        <Button loading={data.loading} children={`Submit`} onClick={handleLogin} type="primary" />
      </Card>
    </Spacer>
  )
}

const Error = styled.div``
