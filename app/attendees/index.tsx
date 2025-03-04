import { Separator } from '@rn-primitives/dropdown-menu';
import { FlashList } from '@shopify/flash-list';
import { useQuery } from '@tanstack/react-query';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { useEffect } from 'react';
import { View } from 'react-native';
import AttendanceCounter from '~/components/screens/attendees/AttendanceCounter';
import CreateAttendeeButton from '~/components/screens/events/EventAttendeesList/CreateAttendeeButton';
import EventAttendeesListItem from '~/components/screens/events/EventAttendeesList/EventAttendeesListItem';
import LoadingSpinner from '~/components/shared/LoadingSpinner';
import { Large } from '~/components/ui/typography';
import { getAttendees } from '~/lib/services/attendeeService';
import { AttendeeStatus } from '~/lib/types/attendee';

export default function AttendeesScreen() {
  const { eventId } = useLocalSearchParams<{ eventId: string }>();
  const navigation = useNavigation();
  const { data, isFetching } = useQuery({
    queryKey: [`attendees?eventId=${eventId}`],
    queryFn: () => getAttendees(eventId),
  });

  useEffect(() => {
    if (!data) return;

    const attendedCount = data
      .filter((attendee) => attendee.status === AttendeeStatus.Attended)
      .reduce((acc, att) => acc + att.ticketCount, 0);

    const attendeesCount = data.reduce((acc, att) => acc + att.ticketCount, 0);

    navigation.setOptions({
      headerRight: () => (
        <View className="flex-row items-center justify-end gap-4">
          <AttendanceCounter
            attendedCount={attendedCount}
            attendeesCount={attendeesCount}
          />
          <CreateAttendeeButton eventId={eventId} />
        </View>
      ),
    });
  }, [data]);

  if (isFetching) return <LoadingSpinner />;

  data?.sort((a, b) => a.name.localeCompare(b.name));

  return (
    <View className="flex-1 bg-secondary pb-4">
      {!!data?.length ? (
        <FlashList
          data={data}
          renderItem={({ item }) => <EventAttendeesListItem attendee={item} />}
          ItemSeparatorComponent={() => <Separator />}
          estimatedItemSize={59}
        />
      ) : (
        <View className="flex-1 items-center justify-center p-6">
          <Large className="text-muted-foreground font-normal">
            No ticket sales yet
          </Large>
        </View>
      )}
    </View>
  );
}
