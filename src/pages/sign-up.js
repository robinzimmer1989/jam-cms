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

import { isLoggedIn } from 'utils/auth'
import getRoute from 'routes'

const SignUp = () => {
  const [data, setData] = useState({
    username: '',
    password: '',
    email: '',
    phone: '',
    authCode: '',
    stage: 0,
    error: '',
    loading: false,
  })

  const isAuthed = isLoggedIn()

  useEffect(() => {
    isAuthed && navigate(getRoute(`app`))
  }, [isAuthed])

  const handleSignUp = async () => {
    const { username, password, email, phone } = data

    if (!username || !password || !email || !phone) {
      return
    }

    handleChange({ target: { name: 'loading', value: true } })

    try {
      await Auth.signUp({
        username,
        password,
        attributes: { email, phone_number: phone },
      })
      setData({ ...data, stage: 1 })
    } catch (err) {
      handleChange({ target: { name: 'error', value: err } })
      console.log('error signing up...', err)
    }

    handleChange({ target: { name: 'loading', value: false } })
  }

  const handleConfirmSignUp = async () => {
    const { username, authCode } = data

    if (!username || !authCode) {
      return
    }

    handleChange({ target: { name: 'loading', value: true } })

    try {
      await Auth.confirmSignUp(username, authCode)
      navigate(getRoute(`app`))
    } catch (err) {
      handleChange({ target: { name: 'error', value: err } })
      console.log('error confirming signing up...', err)
    }

    handleChange({ target: { name: 'loading', value: false } })
  }

  const handleChange = e => setData({ ...data, [e.target.name]: e.target.value })

  return (
    <BaseLayout>
      <Edges size="xs">
        <Spacer mt={30} mb={30}>
          <Card title={`Sign Up`}>
            {data.stage === 0 && (
              <>
                <Spacer mb={20}>
                  <Input label={`Username`} value={data.username} onChange={handleChange} name="username" />
                </Spacer>

                <Spacer mb={20}>
                  <Input
                    label={`Password`}
                    value={data.password}
                    type="password"
                    onChange={handleChange}
                    name="password"
                  />
                </Spacer>

                <Spacer mb={20}>
                  <Input label={`Email`} value={data.email} type="email" onChange={handleChange} name="email" />
                </Spacer>

                <Spacer mb={20}>
                  <Input label={`Phone`} value={data.phone} onChange={handleChange} name="phone" />
                </Spacer>

                <Button children={`Submit`} onClick={handleSignUp} type="primary" />
              </>
            )}

            {data.stage === 1 && (
              <>
                <Spacer mb={20}>
                  <Input label={`Authorization Code`} value={data.authCode} onChange={handleChange} name="authCode" />
                </Spacer>

                <Button children={`Confirm Sign Up`} onClick={handleConfirmSignUp} type="primary" />
              </>
            )}

            {data?.error?.message && <Error errorMessage={data.error} />}
          </Card>
        </Spacer>
      </Edges>
    </BaseLayout>
  )
}

const Error = styled.div``

export default SignUp
