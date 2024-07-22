import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

interface SinglePlusIconProps extends SvgProps {
  color?: string;
}

const SinglePlusIcon = ({ color, ...props }: SinglePlusIconProps) => {
  return (
    <Svg viewBox="0 0 16 16" width={16} height={16} fill="none" {...props}>
      <Path
        fill={color}
        d="M15 7H9V1a1 1 0 0 0-2 0v6H1a1 1 0 0 0 0 2h6v6a1 1 0 0 0 2 0V9h6a1 1 0 0 0 0-2Z"
      />
    </Svg>
  );
};

export default React.memo(SinglePlusIcon);
