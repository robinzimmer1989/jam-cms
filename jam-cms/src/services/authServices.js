import axios from 'axios';

export const signIn = async ({ username, password }, dispatch, config) => {
  try {
    const source = config?.auth || config?.source;

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
