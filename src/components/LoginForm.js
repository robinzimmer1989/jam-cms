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

      if (result) {
        navigate(getRoute(`app`))
      }
    } catch (err) {
      handleChange({ target: { name: 'error', value: err } })
      console.log('error...: ', err)
    }

    handleChange({ target: { name: 'loading', value: false } })
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

        <Button loading={data.loading} children={`Submit`} onClick={handleLogin} type="primary" />

        {data?.error?.message && <Error children={data.error} />}
      </Card>
    </Spacer>
  )
}

const Error = styled.div``
