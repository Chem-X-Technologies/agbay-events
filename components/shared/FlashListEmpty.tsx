import { View } from 'react-native';
import { Muted } from '../ui/typography';

export default function FlashListEmpty({ text }: { text: string }) {
  return (
    <View className="items-center justify-center p-6">
      <Muted>{text}</Muted>
    </View>
  );
}
