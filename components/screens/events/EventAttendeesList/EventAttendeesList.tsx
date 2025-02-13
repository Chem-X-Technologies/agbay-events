import { FlashList } from '@shopify/flash-list';
import { View } from 'react-native';
import { H2, H3 } from '~/components/ui/typography';
import Attendee from '~/lib/types/attendee';
import EventAttendeesListItem from './EventAttendeesListItem';
import { Separator } from '~/components/ui/separator';
import FlashListEmpty from '~/components/shared/FlashListEmpty';
import FlashListHeader from '~/components/shared/FlashListHeader';

export default function EventAttendeesList({
  attendees,
}: {
  attendees: Attendee[];
}) {
  return (
    <View className="flex-1 w-full">
      <FlashList
        data={attendees}
        renderItem={({ item }) => <EventAttendeesListItem attendee={item} />}
        ItemSeparatorComponent={() => <Separator />}
        estimatedItemSize={59}
        ListHeaderComponent={<FlashListHeader text="Attendees" />}
        ListEmptyComponent={<FlashListEmpty text="No attendees yet" />}
      />
    </View>
  );
}
