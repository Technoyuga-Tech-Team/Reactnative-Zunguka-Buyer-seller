import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

interface DoubleRightIconProps extends SvgProps {
  color: string | undefined;
}

const DoubleRightIcon = ({ color, ...props }: DoubleRightIconProps) => {
  return (
    <Svg viewBox="0 0 13 12" width={13} height={12} fill="none" {...props}>
      <Path
        fill={color}
        d="M6.5 11.833a.834.834 0 0 1-.592-1.425L10.325 6 5.908 1.59A.833.833 0 0 1 7.083.416l5 5a.833.833 0 0 1 0 1.175l-5 5a.833.833 0 0 1-.583.242Z"
      />
      <Path
        fill={color}
        d="M1.5 11.833a.834.834 0 0 1-.592-1.425L5.325 6 .908 1.59A.837.837 0 0 1 2.091.408l5 5a.833.833 0 0 1 0 1.175l-5 5a.835.835 0 0 1-.591.25Z"
      />
    </Svg>
  );
};

export default React.memo(DoubleRightIcon);
