import axios from 'axios';

const strapiUrl = process.env.STRAPI_URL;

async function signIIn({ email, password }) {

  const res = await axios.post(`${strapiUrl}/api/auth/local`, {
    identifier: email,
    password,
  });
  return res.data;
}

export default signIIn;