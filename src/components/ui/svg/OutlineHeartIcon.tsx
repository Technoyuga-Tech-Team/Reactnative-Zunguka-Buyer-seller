import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

interface OutlineHeartIconProps extends SvgProps {
  color?: string;
}

const OutlineHeartIcon = ({ color, ...props }: OutlineHeartIconProps) => {
  return (
    <Svg viewBox="0 0 16 14" width={16} height={14} fill="none" {...props}>
      <Path
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M12.975 1.663c-1.788-1.097-3.348-.655-4.286.05-.384.288-.576.432-.689.432-.113 0-.305-.144-.69-.433-.937-.704-2.497-1.146-4.285-.05C.679 3.103.148 7.85 5.56 11.857 6.59 12.618 7.106 13 8 13c.894 0 1.41-.381 2.44-1.145 5.412-4.005 4.881-8.753 2.535-10.192Z"
      />
    </Svg>
  );
};

export default React.memo(OutlineHeartIcon);
