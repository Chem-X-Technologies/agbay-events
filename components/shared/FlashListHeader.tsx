import { View } from 'react-native';
import { H3 } from '../ui/typography';

export default function FlashListHeader({
  text,
  headerRight,
}: {
  text: string;
  headerRight?: React.ReactNode;
}) {
  return (
    <View className="p-4 flex-row justify-between items-center">
      <H3 className="text-center">{text}</H3>
      {!!headerRight && headerRight}
    </View>
  );
}
