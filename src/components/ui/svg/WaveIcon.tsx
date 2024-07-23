import * as React from "react";
import Svg, { Circle, Path, SvgProps } from "react-native-svg";

interface WaveIconProps extends SvgProps {
  color?: string;
}

const WaveIcon = ({ color, ...props }: WaveIconProps) => {
  return (
    <Svg viewBox="0 0 20 24" width={20} height={24} fill="none" {...props}>
      <Path
        stroke="#fff"
        strokeLinecap="round"
        strokeWidth={2}
        d="M15.143 1.286a21.43 21.43 0 0 1 0 21.429M10.429 3.643a16.714 16.714 0 0 1 0 16.715m-4.5-14.55a12.314 12.314 0 0 1 1.619 6.107c0 2.144-.559 4.25-1.62 6.107m-4.5-9.879A6.99 6.99 0 0 1 2.599 12a6.99 6.99 0 0 1-1.17 3.858"
      />
    </Svg>
  );
};

export default React.memo(WaveIcon);
