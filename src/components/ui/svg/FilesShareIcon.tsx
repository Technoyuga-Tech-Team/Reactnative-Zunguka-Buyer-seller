import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

interface FilesShareIconProps extends SvgProps {
  color?: string;
}

const FilesShareIcon = ({ color, ...props }: FilesShareIconProps) => {
  return (
    <Svg viewBox="0 0 18 20" width={18} height={20} fill="none" {...props}>
      <Path
        stroke="#797C7B"
        strokeLinejoin="round"
        strokeWidth={1.369}
        d="M4.417 15.5V8.168a3.667 3.667 0 0 1 3.667-3.666h5.5m-9.167 11a3.667 3.667 0 0 0 3.667 3.666h2.148c.972 0 1.905-.386 2.592-1.074l3.352-3.352a3.667 3.667 0 0 0 1.074-2.592V8.166a3.667 3.667 0 0 0-3.666-3.666m-9.167 11A3.667 3.667 0 0 1 .75 11.834V4.501A3.667 3.667 0 0 1 4.417.834h5.5a3.667 3.667 0 0 1 3.667 3.667M11.75 19.167v-1.833a3.667 3.667 0 0 1 3.667-3.667h1.833"
      />
    </Svg>
  );
};

export default React.memo(FilesShareIcon);
