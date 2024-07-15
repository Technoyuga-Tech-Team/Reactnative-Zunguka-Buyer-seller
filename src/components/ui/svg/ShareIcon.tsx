import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

interface ShareIconProps extends SvgProps {
  color?: string;
}

const ShareIcon = ({ color, ...props }: ShareIconProps) => {
  return (
    <Svg viewBox="0 0 18 18" width={18} height={18} fill="none" {...props}>
      <Path
        fill={color}
        d="M15 12a2.991 2.991 0 0 0-2.53 1.401l-6.674-3.337C5.923 9.732 6 9.376 6 9c0-.376-.077-.733-.204-1.065l6.674-3.337A2.99 2.99 0 0 0 15 5.998a3 3 0 1 0-3-3c0 .051.013.1.015.15L4.908 6.7A2.974 2.974 0 0 0 3 5.997a3 3 0 1 0 0 6c.729 0 1.388-.27 1.908-.703l7.107 3.553c-.002.05-.015.098-.015.15a3 3 0 1 0 6 0A2.996 2.996 0 0 0 15 12Z"
      />
    </Svg>
  );
};

export default React.memo(ShareIcon);
