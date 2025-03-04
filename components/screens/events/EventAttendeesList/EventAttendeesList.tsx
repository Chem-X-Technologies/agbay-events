import { FlashList } from '@shopify/flash-list';
import { View } from 'react-native';
import EventAttendeesListItem from './EventAttendeesListItem';
import { Separator } from '~/components/ui/separator';
import FlashListEmpty from '~/components/shared/FlashListEmpty';
import FlashListHeader from '~/components/shared/FlashListHeader';
import CreateAttendeeButton from './CreateAttendeeButton';
import { Link } from 'expo-router';
import { useQuery } from '@tanstack/react-query';
import { getAttendees } from '~/lib/services/attendeeService';
import LoadingSpinner from '~/components/shared/LoadingSpinner';
import AttendanceCounter from '../../attendees/AttendanceCounter';
import { AttendeeStatus } from '~/lib/types/attendee';
import { Muted } from '~/components/ui/typography';

export default function EventAttendeesList({ eventId }: { eventId: string }) {
  const { data, isFetching } = useQuery({
    queryKey: [`attendees?eventId=${eventId}`],
    queryFn: () => getAttendees(eventId),
  });

  if (isFetching) return <LoadingSpinner />;

  data?.sort((a, b) => a.name.localeCompare(b.name));

  const attendedCount =
    data
      ?.filter((attendee) => attendee.status === AttendeeStatus.Attended)
      .reduce((acc, att) => acc + att.ticketCount, 0) ?? 0;

  const attendeesCount =
    data?.reduce((acc, att) => acc + att.ticketCount, 0) ?? 0;

  return (
    <View className="flex-1 w-full bg-secondary rounded-2xl">
      <FlashListHeader
        text="Ticket Sales"
        headerRight={
          <View className="flex-row items-center gap-4">
            <AttendanceCounter
              attendedCount={attendedCount}
              attendeesCount={attendeesCount}
            />
            <CreateAttendeeButton eventId={eventId} />
          </View>
        }
        className="bg-background rounded-t-2xl"
      />
      <FlashList
        data={data}
        renderItem={({ item }) => <EventAttendeesListItem attendee={item} />}
        ItemSeparatorComponent={() => <Separator />}
        estimatedItemSize={59}
        ListEmptyComponent={<FlashListEmpty text="No ticket sales yet" />}
      />
      <Link href={{ pathname: '/attendees', params: { eventId } }} asChild>
        <Muted className="text-center p-2">View full list</Muted>
      </Link>
    </View>
  );
}
