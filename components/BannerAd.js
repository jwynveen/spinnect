'use strict';

import React from 'react';
import firebase from 'react-native-firebase';
import config from 'react-native-config'

export default class BannerAd extends React.Component {
  constructor(props) {
    super(props);

    // Initiate ad
    const AdRequest = firebase.admob.AdRequest;
    this.bannerRequest = new AdRequest();
  }

  _onAdFailedToLoad(err) {
    console.log(err);
  }

  render() {
    const Banner = firebase.admob.Banner;
    return (
      <Banner
        unitId={config.ADMOB_LEVELBANNER_UNITID}
        size={"BANNER"}
        onAdFailedToLoad={this._onAdFailedToLoad}
        request={this.bannerRequest.build()}
      />
    );
  }
};
