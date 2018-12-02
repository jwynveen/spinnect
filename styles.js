import {
  StyleSheet,
} from 'react-native';

export const variables = {
  color: {
    background: '#DFCFC5',
    buttonText: '#E3F2FD',

    color1: '#558A70',
    color1Light: '#7BAB94',
    color1Dark: '#31634B',
    color2: '#55788A',
    color2Light: '#7B9BAB',
    color2Dark: '#315363',
    color3: '#5E558A',
    color3Light: '#837BAB',
    color3Dark: '#393163',
    /**
     * Get color by difficulty
     * @param {String} difficulty - Easy, Medium, Hard
     * @param {String} variant - null, Light, Dark
     * @returns {String} color hex value
     */
    byDifficulty(difficulty, variant) {
      let colorKey;
      switch (difficulty) {
        case 'Easy':
          colorKey = 'color1';
          break;
        case 'Medium':
          colorKey = 'color2';
          break;
        case 'Hard':
          colorKey = 'color3';
          break;
        default:
          colorKey = 'color1';
          break;
      }

      if (variant && this[colorKey + variant]) {
        return this[colorKey + variant];
      }

      return this[colorKey];
    }
  }
};
