import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

interface PencilIconProps extends SvgProps {
  color?: string;
}

const PencilIcon = ({ color, ...props }: PencilIconProps) => {
  return (
    <Svg viewBox="0 0 16 17" width={16} height={17} fill="none" {...props}>
      <Path
        fill={color}
        d="m13.963 4.023-1.486-1.486A1.778 1.778 0 0 0 11.18 2c-.491 0-.952.193-1.297.54l-8.236 8.274a.498.498 0 0 0-.146.353V14.5a.5.5 0 0 0 .5.5h3.333c.132 0 .26-.053.353-.145l8.274-8.237c.347-.346.54-.807.54-1.297 0-.49-.19-.952-.537-1.298ZM5.127 14H2.5v-2.627l5.995-6.022 2.655 2.654L5.127 14Zm8.128-8.09L11.859 7.3 9.2 4.641l1.39-1.397a.83.83 0 0 1 1.18-.001l1.486 1.485a.831.831 0 0 1-.002 1.18Z"
      />
    </Svg>
  );
};

export default React.memo(PencilIcon);
