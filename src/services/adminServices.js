import { Auth, API } from 'aws-amplify'

export const listEditors = async ({ limit, token }) => {
  let apiName = 'AdminQueries'
  let path = '/listUsersInGroup'
  let myInit = {
    queryStringParameters: {
      groupname: 'editor',
      limit,
      token,
    },
    headers: {
      'Content-Type': 'application/json',
      Authorization: `${(await Auth.currentSession()).getAccessToken().getJwtToken()}`,
    },
  }
  const { NextToken: nextToken, Users: users } = await API.get(apiName, path, myInit)

  return { nextToken, users }
}

export const addToGroup = async ({ username, groupname = 'editor' }) => {
  let apiName = 'AdminQueries'
  let path = '/addUserToGroup'
  let myInit = {
    body: {
      username,
      groupname,
    },
    headers: {
      'Content-Type': 'application/json',
      Authorization: `${(await Auth.currentSession()).getAccessToken().getJwtToken()}`,
    },
  }
  return await API.post(apiName, path, myInit)
}
