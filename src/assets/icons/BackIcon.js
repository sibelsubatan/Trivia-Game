
import * as React from 'react';
import Svg, {ClipPath, Defs, G, Path} from 'react-native-svg';

function BackIcon({size, color}) {
    return (
        <Svg
            width={size || 24}
            height={size || 24}
            fill="#FFF"
            viewBox="0 0 512.006 512.006"
            xmlns="http://www.w3.org/2000/svg">
            <Path d="M388.419,475.59L168.834,256.005L388.418,36.421c8.341-8.341,8.341-21.824,0-30.165s-21.824-8.341-30.165,0
			L123.586,240.923c-8.341,8.341-8.341,21.824,0,30.165l234.667,234.667c4.16,4.16,9.621,6.251,15.083,6.251
			c5.461,0,10.923-2.091,15.083-6.251C396.76,497.414,396.76,483.931,388.419,475.59z"  fill={color||"#000"}/>
        </Svg>
    );
}

export default BackIcon;

