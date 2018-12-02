'use strict';

import React from 'react';
import Svg,{
  Line,
} from 'react-native-svg';

export default class Quad extends React.Component {
  render() {
    return (
      <Svg
        height={this.props.size}
        width={this.props.size}
        viewBox={[0, 0, this.props.size, this.props.size].join(' ')}
        fill="none"
        fillOpacity="0"
      >
        <Line
          x1="0"
          y1={this.props.size / 2}
          x2={this.props.size}
          y2={this.props.size / 2}
          stroke={this.props.color || '#000000'}
          strokeWidth={this.props.size / 4}
        />
        <Line
          x1={this.props.size / 2}
          y1="0"
          x2={this.props.size / 2}
          y2={this.props.size}
          stroke={this.props.color || '#000000'}
          strokeWidth={this.props.size / 4}
        />
      </Svg>
    );
  }
};
