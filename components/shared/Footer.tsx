import { View } from 'react-native';
import { Button } from '../ui/button';
import { QrCode } from '~/lib/icons/QrCode';
import { useCameraPermissions } from 'expo-camera';
import { usePathname, useRouter } from 'expo-router';

export default function Footer() {
  const [permission, requestPermission] = useCameraPermissions();
  const router = useRouter();
  const pathname = usePathname();
  const excludedRoutes = [
    '/scan',
    '/events/create-event',
    '/attendees/create-attendee',
  ];

  const handleScanQrPress = () => {
    requestPermission().then((result) => {
      if (result.granted) {
        router.push('/scan');
      }
    });
  };

  if (
    excludedRoutes.includes(pathname) ||
    pathname.startsWith('/attendees/details')
  ) {
    return null;
  }

  return (
    <View className="bg-secondary items-center p-4">
      <Button
        size="icon"
        variant="ghost"
        className="border-solid border-4 border-background rounded-full p-8"
        onPress={handleScanQrPress}
      >
        <QrCode className="text-foreground" size={30} strokeWidth={2} />
      </Button>
    </View>
  );
}
