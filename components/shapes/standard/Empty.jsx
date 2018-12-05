

import React from 'react';
import Svg from 'react-native-svg';
import PropTypes from 'prop-types';

const propTypes = {
  size: PropTypes.number.isRequired,
};

function Empty({ size }) {
  return (
    <Svg
      height={size}
      width={size}
      viewBox={[0, 0, size, size].join(' ')}
      fill="none"
      fillOpacity="0"
    />
  );
}

Empty.propTypes = propTypes;

export default Empty;
