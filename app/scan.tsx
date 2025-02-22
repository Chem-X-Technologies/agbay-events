import { CameraView, ScanningResult } from 'expo-camera';
import { View } from 'react-native';
import * as Linking from 'expo-linking';
import { useRouter } from 'expo-router';

export default function ScanScreen() {
  const router = useRouter();

  const handleQRCodeDetected = (scanResult: ScanningResult) => {
    const url = scanResult.data;
    const parsedUrl = Linking.parse(url);

    if (
      parsedUrl.scheme === 'agbay-events' &&
      parsedUrl.path?.startsWith('attendees/validate')
    ) {
      router.replace({
        pathname: '/attendees/validate/[id]',
        params: { id: parsedUrl.path.split('/')[2] },
      });
    } else {
      console.log('Invalid deep link:', url);
    }
  };

  return (
    <View className="flex-1 justify-center">
      <CameraView
        style={{ flex: 1 }}
        facing="back"
        onBarcodeScanned={handleQRCodeDetected}
        barcodeScannerSettings={{
          barcodeTypes: ['qr'],
        }}
      >
        <View className="absolute top-1/2 left-1/2 w-64 h-64 -ml-32 -mt-32">
          <View className="absolute w-12 h-12 border-t-2 border-l-2 border-white top-0 left-0"></View>
          <View className="absolute w-12 h-12 border-t-2 border-r-2 border-white top-0 right-0"></View>
          <View className="absolute w-12 h-12 border-b-2 border-l-2 border-white bottom-0 left-0"></View>
          <View className="absolute w-12 h-12 border-b-2 border-r-2 border-white bottom-0 right-0"></View>
        </View>
      </CameraView>
    </View>
  );
}
