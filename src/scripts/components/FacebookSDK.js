import React, {Component} from 'react';

import {FACEBOOK_APP_ID} from '../constants/skeys.js';

export default class FacebookSDK extends Component {

  loadSdk = () => (function(d, s, id){
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/en_UK/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));

  asyncInit = () => {
    window.fbAsyncInit = () => FB.init({
      appId: FACEBOOK_APP_ID,
      status: true,
      cookie: true,
      xfbml: true,
      version: 'v2.10'
    });
  };

  componentDidMount = () => Promise.resolve(this.loadSdk()).then(this.asyncInit());

  render(){ return null; }
}
