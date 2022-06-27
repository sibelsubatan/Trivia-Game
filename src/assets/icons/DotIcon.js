import * as React from "react"
import Svg, { Path } from "react-native-svg"

const DotIcon = ({size,color}) => (
    <Svg
        width={size||24}
        height={size||24}
        fill="none"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
    >
        <Path d="M12 15a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z" fill={color||"#F24E1E"} />
    </Svg>
)

export default DotIcon
