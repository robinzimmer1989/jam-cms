import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { navigate } from '@reach/router'
import { Auth } from 'aws-amplify'
import { Button, Input, Card } from 'antd'

// import app components
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
  })

  const isAuthed = isLoggedIn()

  useEffect(() => {
    isAuthed && navigate(getRoute(`app`))
  }, [isAuthed])

  const handleSignUp = async () => {
    const { username, password, email, phone } = data

    try {
      await Auth.signUp({
        username,
        password,
        attributes: { email, phone_number: phone },
      })
      setData({ ...data, stage: 1 })
    } catch (err) {
      setData({ ...data, error: err })
      console.log('error signing up...', err)
    }
  }

  const handleConfirmSignUp = async () => {
    const { username, authCode } = data

    try {
      await Auth.confirmSignUp(username, authCode)
      navigate(getRoute(`app`))
    } catch (err) {
      setData({ ...data, error: err })
      console.log('error confirming signing up...', err)
    }
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

                <Spacer mb={20}>
                  <Input placeholder={`Email`} value={data.email} type="email" onChange={handleChange} name="email" />
                </Spacer>

                <Spacer mb={20}>
                  <Input placeholder={`Phone`} value={data.phone} onChange={handleChange} name="phone" />
                </Spacer>

                <Button children={`Submit`} onClick={handleSignUp} type="primary" />
              </>
            )}

            {data.stage === 1 && (
              <>
                <Spacer mb={20}>
                  <Input
                    placeholder={`Authorization Code`}
                    value={data.authCode}
                    onChange={handleChange}
                    name="authCode"
                  />
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
