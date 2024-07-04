import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

interface TagIconProps extends SvgProps {
  color?: string;
}

const TagIcon = ({ color, ...props }: TagIconProps) => {
  return (
    <Svg viewBox="0 0 25 25" width={25} height={25} fill="none" {...props}>
      <Path
        fill={color}
        d="m21.409 11.502-1.497-1.5c-.005-.004-.006-.011-.011-.016-.005-.005-.012-.006-.017-.011l-5.674-5.68a3.7 3.7 0 0 0-2.601-1.078H5.872A2.706 2.706 0 0 0 3.171 5.92v5.743c0 .983.383 1.907 1.077 2.602l5.676 5.682.007.01.01.007 1.508 1.509c.824.825 1.699 1.244 2.6 1.244.902 0 1.777-.42 2.6-1.244l4.763-4.766c1.674-1.68 1.674-3.527-.003-5.205Zm-16.74.16V5.919c0-.664.54-1.203 1.202-1.203h5.737c.573 0 1.135.233 1.54.638l5.159 5.164-7.845 7.845-5.154-5.16a2.19 2.19 0 0 1-.638-1.541Zm15.68 3.984-4.762 4.766c-1.066 1.067-2.013 1.067-3.08 0l-.985-.987 7.845-7.845.98.982c1.095 1.095 1.095 1.988.002 3.084Zm-11.43-7.68c0 .552-.445 1-.997 1-.55 0-1.002-.448-1.002-1s.442-1 .993-1h.01c.551 0 .997.448.997 1Z"
      />
    </Svg>
  );
};

export default React.memo(TagIcon);
