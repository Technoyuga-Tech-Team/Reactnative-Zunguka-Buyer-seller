import * as React from "react";
import Svg, { G, Rect, Path, Defs, SvgProps } from "react-native-svg";

interface PayDepositeIconProps extends SvgProps {
  color?: string;
}
const PayDepositeIcon = ({ color, ...props }: PayDepositeIconProps) => {
  return (
    <Svg viewBox="0 0 24 24" width={24} height={24} fill="none" {...props}>
      <Path
        fill={color}
        d="M14.035 11.036c-.36.36-.814.589-1.305.674V12a.75.75 0 0 1-1.5 0v-.292a2.435 2.435 0 0 1-1.965-2.124.75.75 0 0 1 1.49-.168.937.937 0 0 0 .93.834h.63a.927.927 0 0 0 .659-.275.928.928 0 0 0 .276-.66.938.938 0 0 0-.709-.908l-1.447-.359a2.46 2.46 0 0 1-1.332-.867 2.436 2.436 0 0 1 1.467-3.885V3a.75.75 0 0 1 1.5 0v.289a2.433 2.433 0 0 1 2.005 2.127.75.75 0 0 1-1.49.168.937.937 0 0 0-.93-.834h-.63a.936.936 0 0 0-.226 1.842l1.447.36a2.437 2.437 0 0 1 1.13 4.084ZM6 20v-4a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1Zm13.66-4.98c-.23 0-.46.06-.68.19l-2.27 1.36a2.633 2.633 0 0 1-2.59 2.18H11c-.41 0-.75-.34-.75-.75s.34-.75.75-.75h3.12c.62 0 1.13-.5 1.13-1.13 0-.62-.51-1.12-1.13-1.12H9c-1.1 0-2 .9-2 2v2c0 1.1.9 2 2 2h5.6c.91 0 1.79-.31 2.5-.88l3.4-2.72c.32-.25.5-.64.5-1.04 0-.78-.64-1.34-1.34-1.34Z"
      />
    </Svg>
  );
};

export default React.memo(PayDepositeIcon);
