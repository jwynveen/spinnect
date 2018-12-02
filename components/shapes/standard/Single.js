'use strict';

import React from 'react';
import Svg,{
  Circle,
  Line,
} from 'react-native-svg';

export default class Single extends React.Component {
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
          cx={this.props.size / 2}
          cy={this.props.size / 2}
          r={this.props.size / 8 * 1.5}
          fill={this.props.color || '#000000'}
          fillOpacity="1"
          stroke="none"
          strokeWidth="0"
        />
        <Line
          x1={this.props.size / 2}
          y1={this.props.size / 2}
          x2={this.props.size}
          y2={this.props.size / 2}
          stroke={this.props.color || '#000000'}
          strokeWidth={this.props.size / 4}
        />
      </Svg>
    );
  }
};
