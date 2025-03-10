import '~/global.css';

import {
  DarkTheme,
  DefaultTheme,
  Theme,
  ThemeProvider,
} from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { Platform } from 'react-native';
import { NAV_THEME } from '~/lib/constants';
import { useColorScheme } from '~/lib/useColorScheme';
import { PortalHost } from '@rn-primitives/portal';
import { setAndroidNavigationBar } from '~/lib/android-navigation-bar';
import CreateEventButton from '~/components/screens/events/CreateEventButton';
import ReactQueryProvider from '~/components/providers/ReactQueryProvider';
import EventOptions from '~/components/screens/events/EventOptions';
import ToasterProvider from '~/components/providers/ToasterProvider';

const LIGHT_THEME: Theme = {
  ...DefaultTheme,
  colors: NAV_THEME.light,
};
const DARK_THEME: Theme = {
  ...DarkTheme,
  colors: NAV_THEME.dark,
};

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export default function RootLayout() {
  const hasMounted = React.useRef(false);
  const { colorScheme, isDarkColorScheme } = useColorScheme();
  const [isColorSchemeLoaded, setIsColorSchemeLoaded] = React.useState(false);

  useIsomorphicLayoutEffect(() => {
    if (hasMounted.current) {
      return;
    }

    if (Platform.OS === 'web') {
      // Adds the background color to the html element to prevent white background on overscroll.
      document.documentElement.classList.add('bg-background');
    }
    setAndroidNavigationBar(colorScheme);
    setIsColorSchemeLoaded(true);
    hasMounted.current = true;
  }, []);

  if (!isColorSchemeLoaded) {
    return null;
  }

  return (
    <ThemeProvider value={isDarkColorScheme ? DARK_THEME : LIGHT_THEME}>
      <StatusBar style={isDarkColorScheme ? 'light' : 'dark'} />
      <ReactQueryProvider>
        <ToasterProvider>
          <Stack>
            <Stack.Screen
              name="index"
              options={{
                title: 'Events',
                headerBackVisible: false,
                headerRight: () => <CreateEventButton />,
              }}
            />
            <Stack.Screen
              name="events/create-event"
              options={{
                title: 'Create Event',
              }}
            />
            <Stack.Screen
              name="events/details/[id]"
              options={{
                title: 'Event Details',
                headerRight: () => <EventOptions />,
              }}
            />
            <Stack.Screen
              name="events/edit-event/[id]"
              options={{
                title: 'Edit Event',
              }}
            />
            <Stack.Screen
              name="attendees/index"
              options={{
                title: 'Ticket Sales',
              }}
            />
            <Stack.Screen
              name="attendees/create-attendee"
              options={{
                title: 'Log Ticket Sale',
              }}
            />
            <Stack.Screen
              name="attendees/details/[id]"
              options={{
                title: 'Ticket Sale Details',
              }}
            />
            <Stack.Screen
              name="attendees/validate/[id]"
              options={{
                title: 'Ticket Validation',
              }}
            />
            <Stack.Screen
              name="attendees/edit-attendee/[id]"
              options={{
                title: 'Edit Ticket Sale',
              }}
            />
            <Stack.Screen
              name="scan"
              options={{
                title: 'QR Reader',
              }}
            />
          </Stack>
        </ToasterProvider>
      </ReactQueryProvider>
      <PortalHost />
    </ThemeProvider>
  );
}

const useIsomorphicLayoutEffect =
  Platform.OS === 'web' && typeof window === 'undefined'
    ? React.useEffect
    : React.useLayoutEffect;
