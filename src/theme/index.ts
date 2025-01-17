import {FullTheme} from 'react-native-elements';
import {RFValue} from 'react-native-responsive-fontsize';
import {SCREEN_HEIGHT} from '../constant';

const LightThemeColor = {
  primary: '#F3B241',
};
const DarkThemeColor = {
  primary: '#F3B241',
};

export const getTheme = (mode: 'light' | 'dark' = 'dark') => {
  const theme: Partial<FullTheme> = {
    colors: mode === 'dark' ? DarkThemeColor : LightThemeColor,
    spacing: {
      fs10: RFValue(10, SCREEN_HEIGHT),
      fs11: RFValue(11, SCREEN_HEIGHT),
      fs12: RFValue(12, SCREEN_HEIGHT),
      fs13: RFValue(13, SCREEN_HEIGHT),
      fs14: RFValue(14, SCREEN_HEIGHT),
      fs15: RFValue(15, SCREEN_HEIGHT),
      fs16: RFValue(16, SCREEN_HEIGHT),
      fs17: RFValue(17, SCREEN_HEIGHT),
      fs18: RFValue(18, SCREEN_HEIGHT),
      fs19: RFValue(19, SCREEN_HEIGHT),
      fs20: RFValue(20, SCREEN_HEIGHT),
      fs21: RFValue(21, SCREEN_HEIGHT),
      fs22: RFValue(22, SCREEN_HEIGHT),
      fs23: RFValue(23, SCREEN_HEIGHT),
      fs24: RFValue(24, SCREEN_HEIGHT),
      fs25: RFValue(25, SCREEN_HEIGHT),
      fs26: RFValue(26, SCREEN_HEIGHT),
      fs27: RFValue(27, SCREEN_HEIGHT),
      fs28: RFValue(28, SCREEN_HEIGHT),
      fs29: RFValue(29, SCREEN_HEIGHT),
      fs30: RFValue(30, SCREEN_HEIGHT),
    },
    borderRadii: {
      fs10: RFValue(10, SCREEN_HEIGHT),
      fs11: RFValue(11, SCREEN_HEIGHT),
      fs12: RFValue(12, SCREEN_HEIGHT),
      fs13: RFValue(13, SCREEN_HEIGHT),
      fs14: RFValue(14, SCREEN_HEIGHT),
      fs15: RFValue(15, SCREEN_HEIGHT),
      fs16: RFValue(16, SCREEN_HEIGHT),
      fs17: RFValue(17, SCREEN_HEIGHT),
      fs18: RFValue(18, SCREEN_HEIGHT),
      fs19: RFValue(19, SCREEN_HEIGHT),
      fs20: RFValue(20, SCREEN_HEIGHT),
      fs21: RFValue(21, SCREEN_HEIGHT),
      fs22: RFValue(22, SCREEN_HEIGHT),
      fs23: RFValue(23, SCREEN_HEIGHT),
      fs24: RFValue(24, SCREEN_HEIGHT),
      fs25: RFValue(25, SCREEN_HEIGHT),
      fs26: RFValue(26, SCREEN_HEIGHT),
      fs27: RFValue(27, SCREEN_HEIGHT),
      fs28: RFValue(28, SCREEN_HEIGHT),
      fs29: RFValue(29, SCREEN_HEIGHT),
      fs30: RFValue(30, SCREEN_HEIGHT),
    },
    fontSize: {
      fs10: RFValue(10, SCREEN_HEIGHT),
      fs11: RFValue(11, SCREEN_HEIGHT),
      fs12: RFValue(12, SCREEN_HEIGHT),
      fs13: RFValue(13, SCREEN_HEIGHT),
      fs14: RFValue(14, SCREEN_HEIGHT),
      fs15: RFValue(15, SCREEN_HEIGHT),
      fs16: RFValue(16, SCREEN_HEIGHT),
      fs17: RFValue(17, SCREEN_HEIGHT),
      fs18: RFValue(18, SCREEN_HEIGHT),
      fs19: RFValue(19, SCREEN_HEIGHT),
      fs20: RFValue(20, SCREEN_HEIGHT),
      fs21: RFValue(21, SCREEN_HEIGHT),
      fs22: RFValue(22, SCREEN_HEIGHT),
      fs23: RFValue(23, SCREEN_HEIGHT),
      fs24: RFValue(24, SCREEN_HEIGHT),
      fs25: RFValue(25, SCREEN_HEIGHT),
      fs26: RFValue(26, SCREEN_HEIGHT),
      fs27: RFValue(27, SCREEN_HEIGHT),
      fs28: RFValue(28, SCREEN_HEIGHT),
      fs29: RFValue(29, SCREEN_HEIGHT),
      fs30: RFValue(30, SCREEN_HEIGHT),
    },
    fontFamily: {
      light: 'SFProDisplay-Light',
      regular: 'SFProDisplay-Regular',
      medium: 'SFProDisplay-Medium',
      bold: 'SFProDisplay-Bold',
    },
    Text: {
      style: {
        fontFamily: 'SFProDisplay-Regular',
        color: '#333',
      },
    },
  };
  return theme;
};
