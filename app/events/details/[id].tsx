import { useLocalSearchParams } from 'expo-router';
import { View } from 'react-native';
import EventCard from '~/components/screens/events/EventCard';
import EventAttendeesList from '~/components/screens/events/EventAttendeesList';
import { getEventById } from '~/lib/services/eventService';
import { useQuery } from '@tanstack/react-query';
import LoadingSpinner from '~/components/shared/LoadingSpinner';

export default function EventDetailsScreen() {
  const { id } = useLocalSearchParams();
  const { data, isFetching } = useQuery({
    queryKey: [`events/${id}`],
    queryFn: () => getEventById(id as string),
  });

  if (isFetching) return <LoadingSpinner />;

  if (!data) return <></>;

  data.attendees.sort((a, b) => a.name.localeCompare(b.name));

  return (
    <View className="flex-1 p-4 items-center bg-secondary gap-4">
      <EventCard event={data} />
      <EventAttendeesList eventId={data.id} attendees={data.attendees} />
    </View>
  );
}
