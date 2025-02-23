import { View } from 'react-native';
import EventCard from '~/components/screens/events/EventCard';
import EventAttendeesList from '~/components/screens/events/EventAttendeesList';
import DeleteEventConfirmationDialog from '~/components/screens/events/DeleteEventConfirmationDialog';

export default function EventDetailsScreen() {
  return (
    <View className="flex-1 p-4 items-center bg-secondary gap-4">
      <EventCard />
      <EventAttendeesList />
      <DeleteEventConfirmationDialog />
    </View>
  );
}
