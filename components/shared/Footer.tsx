import { View } from 'react-native';
import { Button } from '../ui/button';
import { QrCode } from '~/lib/icons/QrCode';
import { useCameraPermissions } from 'expo-camera';
import { useRouter } from 'expo-router';

export default function Footer() {
  const [permission, requestPermission] = useCameraPermissions();
  const router = useRouter();

  const handleScanQrPress = () => {
    requestPermission().then((result) => {
      if (result.granted) {
        router.push('/scan');
      }
    });
  };

  return (
    <View className="items-center">
      <Button
        size="icon"
        variant="ghost"
        className="border-solid border-4 border-background rounded-full p-8 bg-secondary"
        onPress={handleScanQrPress}
      >
        <QrCode className="text-foreground" size={30} strokeWidth={2} />
      </Button>
    </View>
  );
}
