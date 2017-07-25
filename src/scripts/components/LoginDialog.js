import React, {Component} from 'react';

import Dialog from 'react-toolbox/lib/dialog';

import Login from '../containers/Login';


const LoginDialog = props => (
  <Dialog {...props}>
    <Login />
  </Dialog>
);

export default LoginDialog;
