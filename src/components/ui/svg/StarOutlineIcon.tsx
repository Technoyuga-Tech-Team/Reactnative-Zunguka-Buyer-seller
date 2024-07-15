import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

interface StarOutlineIconProps extends SvgProps {
  color?: string;
}
const StarOutlineIcon = ({ color, ...props }: StarOutlineIconProps) => {
  return (
    <Svg viewBox="0 0 26 25" width={26} height={25} fill="none" {...props}>
      <Path
        fill={color}
        d="M25.059 11.696c.549-.535.745-1.32.51-2.05a1.988 1.988 0 0 0-1.62-1.362l-5.976-.864a.664.664 0 0 1-.502-.364l-2.59-5.223a2.087 2.087 0 0 0-1.88-1.165c-.802 0-1.524.447-1.88 1.165L8.532 7.057a.668.668 0 0 1-.503.364l-5.976.864A1.99 1.99 0 0 0 .435 9.648c-.236.73-.04 1.515.51 2.05l4.32 4.193c.158.153.23.373.192.589l-.988 5.735c-.136.789.184 1.573.832 2.046.65.474 1.498.538 2.21.163l5.18-2.71a.677.677 0 0 1 .625 0l5.184 2.713a2.09 2.09 0 0 0 2.207-.163 2.077 2.077 0 0 0 .83-2.044l-.988-5.737a.66.66 0 0 1 .194-.591l4.316-4.196Zm-5.828 5.01.988 5.738a.741.741 0 0 1-.302.74.754.754 0 0 1-.805.06l-5.184-2.713a2.007 2.007 0 0 0-1.859 0l-5.18 2.71a.75.75 0 0 1-.806-.06.744.744 0 0 1-.303-.742l.988-5.735a1.997 1.997 0 0 0-.579-1.772l-4.32-4.193a.652.652 0 0 1-.17-.682.659.659 0 0 1 .54-.454l5.976-.864a2.003 2.003 0 0 0 1.508-1.092l2.59-5.223c.262-.53 1.106-.53 1.368 0l2.59 5.221c.292.59.856.999 1.508 1.094l5.976.864c.257.037.46.208.54.454a.65.65 0 0 1-.17.682l-4.32 4.193a2.01 2.01 0 0 0-.574 1.773Z"
      />
    </Svg>
  );
};

export default React.memo(StarOutlineIcon);
