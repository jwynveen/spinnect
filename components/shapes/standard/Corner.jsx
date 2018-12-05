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

function Corner({ size, color }) {
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
        stroke={color || '#000000'}
        strokeWidth={size / 4}
        fill="none"
      />
    </Svg>
  );
}

Corner.propTypes = propTypes;
Corner.defaultProps = defaultProps;

export default Corner;
