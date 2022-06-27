import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

const MinusIcon = ({size, color}) => (
  <Svg
    width={size || 20}
    height={size || 20}
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <Path
      d="M17.031 9.258H2.97a.157.157 0 0 0-.156.156v1.172c0 .086.07.156.156.156H17.03c.086 0 .157-.07.157-.156V9.414a.157.157 0 0 0-.157-.156Z"
      fill={color || '#000'}
    />
  </Svg>
);

export default MinusIcon;
