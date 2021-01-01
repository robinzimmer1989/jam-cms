import axios from 'axios';

export const signIn = async ({ username, password }, url) => {
  try {
    const result = await axios.post(url.replace(/\/+$/, ''), {
      username,
      password,
    });

    const { data } = result;

    return data;
  } catch (err) {
    console.log(err);
  }
};

export const resetPassword = async ({ email }, url) => {};
