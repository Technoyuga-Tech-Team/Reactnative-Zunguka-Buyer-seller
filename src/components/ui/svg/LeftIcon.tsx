import * as React from "react";
import Svg, { G, Path, SvgProps } from "react-native-svg";

interface LeftIconProps extends SvgProps {
  color?: string;
}

const LeftIcon = ({ color, ...props }: LeftIconProps) => {
  return (
    <Svg viewBox="0 0 9 16" width={9} height={16} fill="none" {...props}>
      <Path
        fill={color}
        d="M8 16a.997.997 0 0 1-.707-.293l-7-7a.999.999 0 0 1 0-1.414l7-7a.999.999 0 1 1 1.414 1.414L2.414 8l6.293 6.293A.999.999 0 0 1 8 16Z"
      />
    </Svg>
  );
};

export default React.memo(LeftIcon);
