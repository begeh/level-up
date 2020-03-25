import React from 'react';
import ReactDOM from 'react-dom';
import GoogleLogin from 'react-google-login';

const responseGoogle = (response) => {
  console.log(response);
}

export default function GoogleLoginButton() {


  return (
    <>
      <GoogleLogin
        clientId="87071099391-ut31r21f2j0l634c9vavu488sac3d7qr.apps.googleusercontent.com"
        buttonText="Login"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={'single_host_origin'}
      />,
    </>);

}