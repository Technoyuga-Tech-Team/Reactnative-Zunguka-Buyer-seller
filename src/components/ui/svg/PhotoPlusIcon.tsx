import * as React from "react";
import Svg, { Rect, Path, SvgProps } from "react-native-svg";

interface PhotoPlusIconProps extends SvgProps {
  color?: string;
}

const PhotoPlusIcon = ({ color, ...props }: PhotoPlusIconProps) => {
  return (
    <Svg viewBox="0 0 32 30" width={32} height={30} fill="none" {...props}>
      <Path
        stroke="#9CA3AF"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M9 22h6c5 0 7-2 7-7V9c0-5-2-7-7-7H9C4 2 2 4 2 9v6c0 5 2 7 7 7Z"
      />
      <Path
        stroke="#9CA3AF"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M9 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM2.67 18.95l4.93-3.31c.79-.53 1.93-.47 2.64.14l.33.29c.78.67 2.04.67 2.82 0l4.16-3.57c.78-.67 2.04-.67 2.82 0L22 13.9"
      />
      <Rect width={19} height={19} x={12.5} y={10.5} fill="#fff" rx={9.5} />
      <Rect width={19} height={19} x={12.5} y={10.5} stroke="#fff" rx={9.5} />
      <Path
        fill="#F3B241"
        d="M22 11.666a8.336 8.336 0 0 0-8.333 8.333c0 4.6 3.733 8.334 8.333 8.334s8.333-3.734 8.333-8.334S26.6 11.666 22 11.666Zm2.917 8.958h-2.292v2.292a.63.63 0 0 1-.625.625.63.63 0 0 1-.625-.625v-2.292h-2.292a.63.63 0 0 1-.625-.625.63.63 0 0 1 .625-.625h2.292v-2.291a.63.63 0 0 1 .625-.625.63.63 0 0 1 .625.625v2.291h2.292a.63.63 0 0 1 .625.625.63.63 0 0 1-.625.625Z"
      />
    </Svg>
  );
};

export default React.memo(PhotoPlusIcon);
