import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

interface SortIconProps extends SvgProps {
  color?: string;
}

const SortIcon = ({ color, ...props }: SortIconProps) => {
  return (
    <Svg viewBox="0 0 8 10" width={8} height={10} fill="none" {...props}>
      <Path
        fill="#664B1B"
        d="M7.138 5.862c.26.26.26.682 0 .943L4.471 9.47a.665.665 0 0 1-.942 0L.862 6.805a.666.666 0 1 1 .943-.943L4 8.057l2.195-2.195c.261-.26.682-.26.943 0ZM1.805 4.138 4 1.943l2.195 2.195a.665.665 0 0 0 .943 0 .666.666 0 0 0 0-.943L4.471.53a.666.666 0 0 0-.942 0L.862 3.195a.666.666 0 1 0 .943.943Z"
      />
    </Svg>
  );
};

export default React.memo(SortIcon);
