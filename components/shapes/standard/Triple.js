'use strict';

import React from 'react';
import Svg,{
  Circle,
} from 'react-native-svg';

export default class Triple extends React.Component {
  render() {
    return (
      <Svg
        height={this.props.size}
        width={this.props.size}
        viewBox={[0, 0, this.props.size, this.props.size].join(' ')}
        fill="none"
        fillOpacity="0"
      >
        <Circle
          cx={this.props.size}
          cy={this.props.size}
          r={this.props.size / 2}
          stroke={this.props.color || '#000000'}
          strokeWidth={this.props.size / 4}
          fill="none"
        />
        <Circle
          cx="0"
          cy={this.props.size}
          r={this.props.size / 2}
          stroke={this.props.color || '#000000'}
          strokeWidth={this.props.size / 4}
          fill="none"
        />
      </Svg>
    );
  }
};
