import { View } from 'react-native';
import { Large } from '../ui/typography';

export default function FlashListEmpty({ text }: { text: string }) {
  return (
    <View className="items-center justify-center p-6">
      <Large className="text-muted-foreground font-normal">{text}</Large>
    </View>
  );
}
