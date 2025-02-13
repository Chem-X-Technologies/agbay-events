import { useLocalSearchParams } from 'expo-router';
import { View } from 'react-native';
import { MOCK_EVENTS } from '~/lib/constants';
import EventCard from '~/components/screens/events/EventCard';
import EventAttendeesList from '~/components/screens/events/EventAttendeesList';

export default function EventDetailsScreen() {
  const { id } = useLocalSearchParams();
  const event = MOCK_EVENTS.find((event) => event.id === id);

  if (!event) return <></>;

  event.attendees.sort((a, b) => a.name.localeCompare(b.name));

  return (
    <View className="flex-1 p-4 items-center bg-secondary/30 gap-4">
      <EventCard event={event} />
      <EventAttendeesList eventId={event.id} attendees={event.attendees} />
    </View>
  );
}
