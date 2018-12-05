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

function Quad({ size, color }) {
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
      <Line
        x1={size / 2}
        y1="0"
        x2={size / 2}
        y2={size}
        stroke={color}
        strokeWidth={size / 4}
      />
    </Svg>
  );
}

Quad.propTypes = propTypes;
Quad.defaultProps = defaultProps;

export default Quad;
