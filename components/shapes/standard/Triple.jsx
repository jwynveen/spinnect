

import React from 'react';
import Svg, {
  Circle,
} from 'react-native-svg';
import PropTypes from 'prop-types';

const propTypes = {
  size: PropTypes.number.isRequired,
  color: PropTypes.string,
};
const defaultProps = {
  color: '#000000',
};

function Triple({ size, color }) {
  return (
    <Svg
      height={size}
      width={size}
      viewBox={[0, 0, size, size].join(' ')}
      fill="none"
      fillOpacity="0"
    >
      <Circle
        cx={size}
        cy={size}
        r={size / 2}
        stroke={color}
        strokeWidth={size / 4}
        fill="none"
      />
      <Circle
        cx="0"
        cy={size}
        r={size / 2}
        stroke={color}
        strokeWidth={size / 4}
        fill="none"
      />
    </Svg>
  );
}

Triple.propTypes = propTypes;
Triple.defaultProps = defaultProps;

export default Triple;
