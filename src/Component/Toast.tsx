import React from 'react';
import RNToast from 'react-native-toast-message';

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <>
      {children}
      <RNToast />
    </>
  );
};

export const useToast = () => {
  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    RNToast.show({
      type: type,
      text1: message,
      position: 'bottom',
      bottomOffset: 50,
      visibilityTime: 3000,
      autoHide: true,
      onPress: () => {
        RNToast.hide();
      },
    });
  };

  return { showToast };
};
