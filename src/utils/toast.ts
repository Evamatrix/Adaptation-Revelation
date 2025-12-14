import React from 'react';
import { BaseToast, BaseToastProps } from 'react-native-toast-message';
import Colors from '../constants/colors';
import { getFont } from '../constants/fonts';

// Notification styling
export const toastConfig: { [key: string]: (props: BaseToastProps) => React.ReactElement } = {
  success: (props: BaseToastProps) =>
    React.createElement(BaseToast, {
      ...props,
      style: { borderLeftColor: Colors.success },
      contentContainerStyle: { paddingHorizontal: 15 },
      text2Style: {
        fontFamily: getFont('mono'),
        fontSize: 14,
        color: Colors.subtext,
      },
    }),
};

export default toastConfig;
