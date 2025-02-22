import { Link } from 'expo-router';
import { View } from 'react-native';
import { Large, Muted, Small } from '~/components/ui/typography';
import { Ticket } from '~/lib/icons/Ticket';
import Attendee, { AttendeeStatus } from '~/lib/types/attendee';

export default function EventAttendeesListItem({
  attendee,
}: {
  attendee: Attendee;
}) {
  const statusColorMap = {
    [AttendeeStatus.Attended]: 'text-green-400',
    [AttendeeStatus.NoShow]: 'text-red-400',
    [AttendeeStatus.ForAttendance]: 'text-yellow-400',
  };

  return (
    <Link
      href={{
        pathname: '/attendees/details/[id]',
        params: { id: attendee.id, showShareButton: 'false' },
      }}
    >
      <View className="p-4 gap-2 bg-background w-full flex-row justify-between items-center">
        <View>
          <Large>{attendee.name}</Large>
          <View className="flex-row gap-1 items-center">
            <Ticket size={18} className="text-muted-foreground" />
            <Muted>x {attendee.ticketCount}</Muted>
          </View>
        </View>
        <Small className={statusColorMap[attendee.status]}>
          {attendee.status}
        </Small>
      </View>
    </Link>
  );
}
