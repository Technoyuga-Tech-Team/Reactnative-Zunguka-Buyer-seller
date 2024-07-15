import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

interface FilterIconProps extends SvgProps {}

const FilterIcon = ({ color, ...props }: FilterIconProps) => {
  return (
    <Svg viewBox="0 0 16 16" width={16} height={16} fill="none" {...props}>
      <Path
        fill="#664B1B"
        d="M13.333 4.666H2.667a.666.666 0 1 1 0-1.333h10.666a.666.666 0 1 1 0 1.333ZM12 8a.666.666 0 0 0-.667-.667H4.667a.666.666 0 1 0 0 1.333h6.666A.666.666 0 0 0 12 8Zm-2 4a.667.667 0 0 0-.667-.667H6.667a.667.667 0 1 0 0 1.333h2.666A.666.666 0 0 0 10 12Z"
      />
    </Svg>
  );
};

export default React.memo(FilterIcon);
