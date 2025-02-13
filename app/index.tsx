import { FlashList } from '@shopify/flash-list';
import { View } from 'react-native';
import EventListItem from '~/components/screens/events/EventListItem';
import { Separator } from '~/components/ui/separator';
import { MOCK_EVENTS } from '~/lib/constants';

export default function EventsScreen() {
  return (
    <View className="flex-1 bg-secondary/30">
      <FlashList
        data={MOCK_EVENTS}
        renderItem={({ item }) => <EventListItem event={item} />}
        ItemSeparatorComponent={() => <Separator />}
        estimatedItemSize={59}
      />
    </View>
  );
}
