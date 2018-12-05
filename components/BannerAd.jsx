import React from 'react';
import firebase from 'react-native-firebase';
import config from 'react-native-config';

export default class BannerAd extends React.Component {
  constructor(props) {
    super(props);

    // Initiate ad
    this.bannerRequest = new firebase.admob.AdRequest();
  }

  static onAdFailedToLoad(err) {
    console.log(err);
  }

  render() {
    const { admob: { Banner } } = firebase;
    return (
      <Banner
        unitId={config.ADMOB_LEVELBANNER_UNITID}
        size="BANNER"
        onAdFailedToLoad={this.onAdFailedToLoad}
        request={this.bannerRequest.build()}
      />
    );
  }
}
