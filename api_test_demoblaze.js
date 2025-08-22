const axios = require('axios');

const api = 'https://api.demoblaze.com/';
const usuario = 'usuario_' + Math.floor(Math.random() * 10000);
const password = 'clave123';

async function signup(username, password) {
  const res = await axios.post(api + 'signup', { username, password });
  return res.data;
}

async function login(username, password) {
  const res = await axios.post(api + 'login', { username, password });
  return res.data;
}

(async () => {
  console.log('Signup nuevo:', await signup(usuario, password));
  console.log('Signup existente:', await signup(usuario, password));
  console.log('Login correcto:', await login(usuario, password));
  console.log('Login incorrecto:', await login(usuario, 'clave_incorrecta'));
})();
