import { View } from 'react-native';
import { H3 } from '~/components/ui/typography';

export default function EventListHeader({ header }: { header: string }) {
  return (
    <View className="p-4 gap-2 w-full bg-secondary">
      <H3 className="text-center">{header}</H3>
    </View>
  );
}
