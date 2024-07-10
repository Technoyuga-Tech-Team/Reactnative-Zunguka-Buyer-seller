import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

interface CameraLIconProps extends SvgProps {
  color?: string;
}

const CameraLIcon = ({ color, ...props }: CameraLIconProps) => {
  return (
    <Svg viewBox="0 0 25 25" width={25} height={25} fill="none" {...props}>
      <Path
        fill={color}
        d="M21.011 5.716h-3.22l-.375-1.125a2.733 2.733 0 0 0-2.6-1.875h-4.633A2.735 2.735 0 0 0 7.585 4.59L7.21 5.716H3.989A2.742 2.742 0 0 0 1.25 8.455V19.48a2.742 2.742 0 0 0 2.739 2.736h17.025a2.742 2.742 0 0 0 2.736-2.74V8.453a2.742 2.742 0 0 0-2.739-2.736Zm1.239 13.76a1.24 1.24 0 0 1-1.239 1.24H3.989a1.24 1.24 0 0 1-1.239-1.24V8.453a1.24 1.24 0 0 1 1.239-1.236H7.75a.75.75 0 0 0 .711-.513l.547-1.64a1.237 1.237 0 0 1 1.175-.847h4.634a1.237 1.237 0 0 1 1.175.847l.547 1.64a.75.75 0 0 0 .71.513h3.762a1.24 1.24 0 0 1 1.239 1.239v11.022Z"
      />
      <Path
        fill={color}
        d="M12.5 7.966a5.625 5.625 0 1 0 0 11.25 5.625 5.625 0 0 0 0-11.25Zm0 9.75a4.125 4.125 0 1 1 0-8.25 4.125 4.125 0 0 1 0 8.25ZM20 10.216a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z"
      />
    </Svg>
  );
};

export default React.memo(CameraLIcon);
