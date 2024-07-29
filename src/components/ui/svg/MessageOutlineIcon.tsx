import * as React from "react";
import Svg, { G, Path, SvgProps } from "react-native-svg";

interface MessageOutlineIconProps extends SvgProps {
  color?: string;
}

const MessageOutlineIcon = ({ color, ...props }: MessageOutlineIconProps) => {
  return (
    <Svg viewBox="0 0 14 15" width={14} height={15} fill="none" {...props}>
      <Path
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M1 4.2c0-1.12 0-1.68.218-2.108a2 2 0 0 1 .874-.874C2.52 1 3.08 1 4.2 1h5.6c1.12 0 1.68 0 2.108.218a2 2 0 0 1 .874.874C13 2.52 13 3.08 13 4.2v3.6c0 1.12 0 1.68-.218 2.108a2 2 0 0 1-.874.874C11.48 11 10.92 11 9.8 11H8.122c-.416 0-.624 0-.823.04a2.002 2.002 0 0 0-.507.179c-.181.092-.344.222-.669.482l-1.59 1.272c-.277.222-.416.333-.533.333a.333.333 0 0 1-.26-.125c-.073-.091-.073-.269-.073-.624V11c-.62 0-.93 0-1.185-.068a2 2 0 0 1-1.414-1.414C1 9.263 1 8.953 1 8.333V4.2Z"
      />
    </Svg>
  );
};

export default React.memo(MessageOutlineIcon);
