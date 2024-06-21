import {
  LinkingOptions,
  NavigationContainer,
  useNavigationContainerRef,
} from '@react-navigation/native';
import React from 'react';
import {Linking} from 'react-native';
import {BASE_PORT} from '../constant';
import MainStack from './MainStack';

const linking: LinkingOptions<{}> = {
  prefixes: [`http://${BASE_PORT}/`, `zunguka://`],
  async getInitialURL() {
    // First, you may want to do the default deep link handling
    // Check if app was opened from a deep link
    const url = await Linking.getInitialURL();
    if (url != null) {
      return url;
    }
  },

  config: {
    screens: {
      EmailVerify: 'verify-email/:token/:email',
      NewPassword: 'password-setup/:token',
      ChatRoom: 'chat-box/:id/:sender_id/:chat_id/:fireConsole',
      BuyerSellerStack: {
        screens: {
          ProductDetails: 'viewing-profile/:itemId',
        },
      },
    },
  },
};

const MainNavigator = () => {
  const navigationRef = useNavigationContainerRef();

  return (
    <NavigationContainer ref={navigationRef} linking={linking}>
      <MainStack />
    </NavigationContainer>
  );
};

export default MainNavigator;
