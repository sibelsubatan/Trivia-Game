
import * as React from 'react';
import Svg, { Path, G } from 'react-native-svg';

function MenuIcon({ size, color }) {
  return (
    <Svg width={size || 24}
      height={size || 24}
      fill="#FFF" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">

      <Path d="M29,6H3A1,1,0,0,0,3,8H29a1,1,0,0,0,0-2Z" fill={color || "#FFF"} />
      <Path d="M3,17H16a1,1,0,0,0,0-2H3a1,1,0,0,0,0,2Z" fill={color || "#FFF"} />
      <Path d="M25,24H3a1,1,0,0,0,0,2H25a1,1,0,0,0,0-2Z" fill={color || "#FFF"} />

    </Svg>
  );
}

export default MenuIcon;



