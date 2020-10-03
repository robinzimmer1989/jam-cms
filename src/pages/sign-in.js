import React from 'react'
import { Link } from 'gatsby'
import { navigate } from '@reach/router'
import { Auth } from 'aws-amplify'

// import app components
import Edges from '../components/Edges'
import Error from '../components/Error'
import { setUser, isLoggedIn } from '../utils/auth'

class Login extends React.Component {
  state = {
    username: ``,
    password: ``,
    error: ``,
  }

  handleUpdate = event => {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  login = async () => {
    const { username, password } = this.state
    try {
      await Auth.signIn(username, password)
      const user = await Auth.currentAuthenticatedUser()
      const userInfo = {
        ...user.attributes,
        username: user.username,
      }
      setUser(userInfo)
      navigate('/app')
    } catch (err) {
      this.setState({ error: err })
      console.log('error...: ', err)
    }
  }

  render() {
    if (isLoggedIn()) navigate('/app/profile')
    return (
      <Edges size="xs">
        <h1>Sign In</h1>
        {this.state.error && <Error errorMessage={this.state.error} />}
        <div style={styles.formContainer}>
          <input
            onChange={this.handleUpdate}
            placeholder="Username"
            name="username"
            value={this.state.username}
            style={styles.input}
          />
          <input
            onChange={this.handleUpdate}
            placeholder="Password"
            name="password"
            value={this.state.password}
            type="password"
            style={styles.input}
          />
          <div style={styles.button} onClick={this.login}>
            <span style={styles.buttonText}>Sign In</span>
          </div>
        </div>
        <Link to="/app/signup">Sign Up</Link>
        <br />
      </Edges>
    )
  }
}

const styles = {
  input: {
    height: 40,
    margin: '10px 0px',
    padding: 7,
  },
  formContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  button: {
    backgroundColor: 'rebeccapurple',
    padding: '15px 7px',
    cursor: 'pointer',
    textAlign: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
  },
}

export default Login
