import axios from 'axios';

export const signIn = async ({ username, password }) => {
  try {
    const source = process.env.GATSBY_CMS_AUTH || process.env.GATSBY_CMS_SOURCE;

    const result = await axios.post(source.replace(/\/+$/, ''), {
      username,
      password,
    });

    const { data } = result;

    return data;
  } catch (err) {
    console.log(err);
  }
};

export const resetPassword = async ({ email }) => {};
