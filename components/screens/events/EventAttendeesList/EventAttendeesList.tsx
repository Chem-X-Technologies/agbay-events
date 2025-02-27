import { FlashList } from '@shopify/flash-list';
import { View } from 'react-native';
import EventAttendeesListItem from './EventAttendeesListItem';
import { Separator } from '~/components/ui/separator';
import FlashListEmpty from '~/components/shared/FlashListEmpty';
import FlashListHeader from '~/components/shared/FlashListHeader';
import CreateAttendeeButton from './CreateAttendeeButton';
import { useLocalSearchParams } from 'expo-router';
import { useQuery } from '@tanstack/react-query';
import { getAttendees } from '~/lib/services/attendeeService';
import LoadingSpinner from '~/components/shared/LoadingSpinner';

export default function EventAttendeesList() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data, isFetching } = useQuery({
    queryKey: [`attendees?eventId=${id}`],
    queryFn: () => getAttendees(id),
  });

  if (isFetching) return <LoadingSpinner />;

  data?.sort((a, b) => a.name.localeCompare(b.name));

  return (
    <View className="flex-1 w-full bg-secondary rounded-2xl">
      <FlashListHeader
        text="Ticket Sales"
        headerRight={<CreateAttendeeButton />}
        className="bg-background rounded-t-2xl"
      />
      <FlashList
        data={data}
        renderItem={({ item }) => <EventAttendeesListItem attendee={item} />}
        ItemSeparatorComponent={() => <Separator />}
        estimatedItemSize={59}
        ListEmptyComponent={<FlashListEmpty text="No ticket sales yet" />}
      />
    </View>
  );
}
