

import React from 'react';
import Svg, {
  Circle,
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

function Single({ size, color }) {
  return (
    <Svg
      height={size}
      width={size}
      viewBox={[0, 0, size, size].join(' ')}
      fill="none"
      fillOpacity="0"
    >
      <Circle
        cx={size / 2}
        cy={size / 2}
        r={size / 8 * 1.5}
        fill={color}
        fillOpacity="1"
        stroke="none"
        strokeWidth="0"
      />
      <Line
        x1={size / 2}
        y1={size / 2}
        x2={size}
        y2={size / 2}
        stroke={color}
        strokeWidth={size / 4}
      />
    </Svg>
  );
}

Single.propTypes = propTypes;
Single.defaultProps = defaultProps;

export default Single;
