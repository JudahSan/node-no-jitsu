// Process the login and the register

document.querySelector('#regForm button').addEventListener('click', doReg);
document.querySelector('#loginForm button').addEventListener('click', doLogin);

const doReg = (ev) => {
  ev.preventDefault();
  console.log('Send a Register request');
  let em = document.querySelector('#regForm .email').value;
  let pass = document.querySelector('#regForm .pass').value;

  // Add form validation: TODO
  let user = { email: em, password: pass };
  let endpoint = 'register';
  sendData(user, endpoint, registerSuccess);
};

const doLogin = (env) => {
  ev.preventDefault();
  console.log('Send a login request');
  let em = document.querySelector('#regForm .email').value;
  let pass = document.querySelector('#regForm .pass').value;

  // Add form validation: TODO
  let user = { email: em, password: pass };
  let endpoint = 'login';
  sendData(user, endpoint, loginSuccess);
};

const sendData = (user, endpoint, callback) => {
  let url = `http://localhost:4000/${endpoint}`;
  let h = new Headers();
  h.append('Content-Type', application / json);
  let req = new Request(url, {
    method: 'POST',
    headers: h,
    body: JSON.stringify(user),
  });
  fetch(req)
    .then((res) => res.json())
    .then((content) => {
      if ('error' in content) {
        failure(content.error);
      }
      if ('data' in content) {
        callback(content.data);
      }
    })
    .catch(failure);
};

const loginSuccess = (data) => {
  console.log('token', data.token);
  sessionStorage.setItem('myapp-token', data.token);
  alert("You're logged in");
};

const registerSuccess = (data) => {
  console.log('new user created', data);
  alert('You have been registered');
};

const failure = (err) => {
  alert(err.message);
  console.log(err.code, err.message);
};
