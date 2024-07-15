import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

interface filledHeartIconProps extends SvgProps {}

const filledHeartIcon = ({ color, ...props }: filledHeartIconProps) => {
  return (
    <Svg viewBox="0 0 14 12" width={14} height={12} fill="none" {...props}>
      <Path
        fill={color}
        d="M11.975.663C10.187-.434 8.627.008 7.69.713c-.384.288-.576.432-.689.432-.113 0-.305-.144-.69-.433C5.374.008 3.814-.434 2.026.662-.321 2.103-.852 6.85 4.56 10.857 5.59 11.618 6.106 12 7 12c.894 0 1.41-.381 2.44-1.145C14.852 6.85 14.321 2.102 11.975.663Z"
      />
    </Svg>
  );
};

export default React.memo(filledHeartIcon);
