import { View } from 'react-native';
import AttendeeCard from '~/components/screens/attendees/AttendeeCard';

export default function AttendeeDetailsScreen() {
  return (
    <View className="flex-1 p-4 items-center bg-secondary gap-4">
      <AttendeeCard />
    </View>
  );
}
