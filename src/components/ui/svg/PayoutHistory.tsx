import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

interface PayoutHistoryProps extends SvgProps {
  color?: string;
}

const PayoutHistory = ({ color, ...props }: PayoutHistoryProps) => {
  return (
    <Svg viewBox="0 0 512 512" width={512} height={512} {...props}>
      <Path
        fill={color}
        d="m213.027-.168 7.207-.01c5.015-.006 10.03-.008 15.045-.007 6.35 0 12.699-.014 19.049-.031 4.958-.011 9.916-.013 14.875-.013 2.337 0 4.674-.005 7.01-.013 21.705-.066 43.21 1.423 64.768 3.882 2.117.239 4.235.462 6.353.684 33.922 3.728 65.667 17.256 87.655 44.369 20.51 26.344 25.477 54.838 27.816 87.301.255 3.537.519 7.073.783 10.61l.51 6.962.23 3.093c1.33 18.645 1.818 37.239 1.77 55.927l-.005 6.497c-.003 5.619-.013 11.238-.024 16.857-.01 5.766-.015 11.532-.02 17.298-.01 11.254-.028 22.508-.049 33.762-3.47-1.344-6.665-2.883-9.908-4.716-20.3-11.395-42.792-16.514-65.967-16.534l-2.104-.002C351.456 265.804 318.5 279.996 292 305l-2.422 2.191C277.426 318.627 268.72 332.84 262 348l-.85 1.897c-14.152 32.021-15.522 70.058-3.084 102.92 1.236 3.098 2.57 6.138 3.934 9.183l1.555 3.484c6.114 12.93 14.101 24.645 24.092 34.888C291 503.819 291 503.819 291 506c-15.768 1.232-31.55 1.154-47.355 1.13a3776.93 3776.93 0 0 0-11.374.004c-23.716.03-47.465-.062-71.083-2.447l-1.963-.193c-4.745-.468-9.486-.97-14.225-1.494l-2.035-.224c-39.325-4.368-72.173-16.005-97.656-47.686C21.479 423.196 19.452 386.357 17 348l-.165-2.531C12.857 283.442 12.965 220.02 17 158l.169-2.637C22.115 78.663 22.115 78.663 48 48l2.516-3.008C61.326 32.45 74.298 23.454 89 16l2.906-1.492C108.992 6.603 128.815 5 147.312 3.25c2.069-.208 4.137-.418 6.206-.629 2.031-.203 4.063-.405 6.095-.605l2.707-.269c16.915-1.596 33.726-1.91 50.707-1.915ZM112.5 142.875c-3.958 6.01-5.048 11.489-4.09 18.57 1.547 6.7 4.545 11.176 10.215 15.055 5.494 3.375 10.072 3.648 16.414 3.647l2.836.011c3.15.011 6.301.015 9.452.019l6.76.02c6.133.017 12.265.028 18.397.036l11.491.018a35060.161 35060.161 0 0 0 42.151.046c11.078.008 22.156.033 33.234.066 11.378.033 22.755.05 34.132.054 6.386.002 12.772.011 19.159.036 6.009.024 12.018.028 18.027.018 2.204 0 4.408.006 6.612.02 3.013.017 6.024.01 9.036-.003l2.636.033c6.865-.072 12.051-1.95 17.28-6.45 5.245-6.25 7.285-11.26 7.063-19.485-.894-7.587-4.477-12.357-10.207-17.176-5.359-3.602-10.104-3.701-16.364-3.684l-2.837-.016c-3.14-.015-6.28-.016-9.42-.016a6647.822 6647.822 0 0 0-25.1-.061c-3.82-.004-7.642-.01-11.464-.017a20330.803 20330.803 0 0 0-37.942-.041h-2.065l-2.068-.001c-11.051-.004-22.102-.03-33.152-.068-11.357-.038-22.714-.057-34.07-.058-6.373 0-12.745-.01-19.116-.038-5.996-.026-11.992-.028-17.988-.012-2.197.002-4.394-.005-6.59-.02-18.114-.47-18.114-.47-32.422 9.497Zm1.625 101.063-1.68 1.964c-3.947 5.729-4.169 11.343-3.445 18.098 1.772 7.086 5.887 12.073 12 16 4.052 1.563 7.445 2.254 11.78 2.274l3.423.03 3.712.002 3.944.026c3.56.022 7.12.03 10.68.035 2.229.004 4.457.01 6.685.017 7.786.025 15.572.038 23.358.042 7.238.003 14.475.033 21.713.075 6.23.035 12.46.05 18.689.05 3.714.002 7.427.01 11.14.039 4.149.031 8.295.022 12.443.01l3.688.044c7.568-.064 13.48-1.206 19.745-5.644 5.12-5.305 7.716-10.473 8.313-17.875-.226-6.979-2.955-12.173-7.325-17.484-7.355-6.07-14.15-6.219-23.345-6.159-1.338-.005-2.676-.012-4.014-.02-3.614-.019-7.227-.012-10.841 0-3.793.01-7.586.001-11.38-.005-6.368-.007-12.736.002-19.105.022-7.348.021-14.696.014-22.044-.008-6.325-.018-12.65-.02-18.974-.01-3.77.006-7.541.007-11.312-.006-3.546-.012-7.091-.004-10.637.02a541.61 541.61 0 0 1-5.735-.017c-8.78.086-15.587 1.365-21.476 8.48Z"
      />
      <Path
        fill={color}
        d="M460.83 323.607c20.86 19.1 34.741 45.084 36.291 73.623 1.267 31.437-8.78 59.27-29.742 82.7-17.867 18.722-44.13 31.547-70.164 32.406-32.234.4-59.578-7.577-83.536-30.201-18.46-18.008-31.503-43.666-31.882-69.846-.342-28.781 5.758-55.21 25.203-77.289l2.047-2.48C325.289 313.403 348.546 302.137 373 298l2.344-.398c30.55-4.218 62.407 5.74 85.487 26.005ZM378 331c-3.097 4.137-3.383 7.244-3.404 12.357l-.02 2.19c-.02 2.379-.015 4.757-.01 7.137l-.015 4.98a1920.4 1920.4 0 0 0 .003 10.427c.011 4.447-.009 8.892-.038 13.339a1463.31 1463.31 0 0 0-.012 10.282c0 1.639-.006 3.278-.019 4.917-.015 2.295-.004 4.59.013 6.884v3.952c.704 4.96 2.867 8.05 6.537 11.383 4.718 1.833 9.382 1.6 14.399 1.586l3.365.015c2.346.007 4.692.006 7.038-.003 3.584-.008 7.167.02 10.75.052 2.283.002 4.565.001 6.847-.002l3.239.034c6.1-.057 9.686-.455 14.327-4.53 2.775-3.133 3.222-5.437 3-9.5-.67-4.51-2.369-6.666-6-9.5-3.226-1.613-6.747-1.12-10.29-1.098l-2.48.005c-2.618.005-5.236.018-7.855.03-1.773.006-3.547.01-5.32.014-4.352.011-8.703.028-13.055.049l.04-2.269c.12-7.076.212-14.152.27-21.229.032-3.637.074-7.275.143-10.912.065-3.514.1-7.028.116-10.543.017-1.985.063-3.97.11-5.954.076-7.785.076-7.785-3.57-14.405-3.165-3.084-5.565-3.803-9.93-3.958-3.568.442-5.55 1.892-8.179 4.27Z"
      />
    </Svg>
  );
};

export default React.memo(PayoutHistory);
