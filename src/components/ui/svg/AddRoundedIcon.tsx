import * as React from "react";
import Svg, { G, Path, SvgProps } from "react-native-svg";

interface AddRoundedIconProps extends SvgProps {
  color?: string;
}

const AddRoundedIcon = ({ color, ...props }: AddRoundedIconProps) => {
  return (
    <Svg viewBox="0 0 16 17" width={16} height={17} fill="none" {...props}>
      <Path
        fill={color}
        d="M8 1.833A6.67 6.67 0 0 0 1.333 8.5 6.67 6.67 0 0 0 8 15.166 6.67 6.67 0 0 0 14.667 8.5 6.67 6.67 0 0 0 8 1.833ZM10.333 9H8.5v1.833c0 .273-.227.5-.5.5a.504.504 0 0 1-.5-.5V9H5.667a.504.504 0 0 1-.5-.5c0-.274.226-.5.5-.5H7.5V6.166c0-.273.227-.5.5-.5s.5.227.5.5V8h1.833c.274 0 .5.226.5.5 0 .273-.226.5-.5.5Z"
      />
    </Svg>
  );
};

export default React.memo(AddRoundedIcon);
