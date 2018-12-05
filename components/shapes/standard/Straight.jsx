

import React from 'react';
import Svg, {
  Line,
} from 'react-native-svg';
import PropTypes from 'prop-types';

const propTypes = {
  size: PropTypes.number.isRequired,
  color: PropTypes.string,
};
const defaultProps = {
  color: '#000000',
};

function Straight({ size, color }) {
  return (
    <Svg
      height={size}
      width={size}
      viewBox={[0, 0, size, size].join(' ')}
      fill="none"
      fillOpacity="0"
    >
      <Line
        x1="0"
        y1={size / 2}
        x2={size}
        y2={size / 2}
        stroke={color}
        strokeWidth={size / 4}
      />
    </Svg>
  );
}

Straight.propTypes = propTypes;
Straight.defaultProps = defaultProps;

export default Straight;
