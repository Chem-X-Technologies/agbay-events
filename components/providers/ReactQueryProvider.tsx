import {
  focusManager,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { ReactNode, useEffect } from 'react';
import { AppState, AppStateStatus, Platform } from 'react-native';

const queryClient = new QueryClient();

export default function ReactQueryProvider({
  children,
}: {
  children: ReactNode;
}) {
  // useEffect(() => {
  //   const subscription = AppState.addEventListener('change', onAppStateChange);

  //   return () => subscription.remove();
  // }, []);

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}

function onAppStateChange(status: AppStateStatus) {
  if (Platform.OS !== 'web') {
    focusManager.setFocused(status === 'active');
  }
}
