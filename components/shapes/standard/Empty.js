'use strict';

import React from 'react';
import Svg from 'react-native-svg';

export default class Empty extends React.Component {
  render() {
    return (
      <Svg
        height={this.props.size}
        width={this.props.size}
        viewBox={[0, 0, this.props.size, this.props.size].join(' ')}
        fill="none"
        fillOpacity="0"
      ></Svg>
    );
  }
};
