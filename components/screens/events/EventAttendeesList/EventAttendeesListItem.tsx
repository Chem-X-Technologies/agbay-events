import { View } from 'react-native';
import { Large, Muted, Small } from '~/components/ui/typography';
import Attendee, { AttendeeStatus } from '~/lib/types/attendee';

export default function EventAttendeesListItem({
  attendee,
}: {
  attendee: Attendee;
}) {
  const statusColorMap = {
    [AttendeeStatus.Attended]: 'text-green-500',
    [AttendeeStatus.NoShow]: 'text-red-500',
    [AttendeeStatus.Waiting]: 'text-yellow-500',
  };

  return (
    <View className="p-4 gap-2 bg-background w-full flex-row justify-between items-center">
      <View>
        <Large>{attendee.name}</Large>
        <Muted>Tickets x {attendee.ticketCount}</Muted>
      </View>
      <Small className={statusColorMap[attendee.status]}>
        {attendee.status}
      </Small>
    </View>
  );
}
