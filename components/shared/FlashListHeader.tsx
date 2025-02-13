import { View } from 'react-native';
import { H3 } from '../ui/typography';

export default function FlashListHeader({ text }: { text: string }) {
  return (
    <View className="p-4">
      <H3 className="text-center">{text}</H3>
    </View>
  );
}
