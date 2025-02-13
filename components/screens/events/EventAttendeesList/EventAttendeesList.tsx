import { FlashList } from '@shopify/flash-list';
import { View } from 'react-native';
import Attendee from '~/lib/types/attendee';
import EventAttendeesListItem from './EventAttendeesListItem';
import { Separator } from '~/components/ui/separator';
import FlashListEmpty from '~/components/shared/FlashListEmpty';
import FlashListHeader from '~/components/shared/FlashListHeader';
import CreateAttendeeButton from './CreateAttendeeButton';

export default function EventAttendeesList({
  eventId,
  attendees,
}: {
  eventId: string;
  attendees: Attendee[];
}) {
  return (
    <View className="flex-1 w-full">
      <FlashListHeader
        text="Ticket Sales"
        headerRight={<CreateAttendeeButton eventId={eventId} />}
      />
      <FlashList
        data={attendees}
        renderItem={({ item }) => <EventAttendeesListItem attendee={item} />}
        ItemSeparatorComponent={() => <Separator />}
        estimatedItemSize={59}
        ListEmptyComponent={<FlashListEmpty text="No ticket sales yet" />}
      />
    </View>
  );
}
