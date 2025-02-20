import { View } from 'react-native';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '~/components/ui/card';
import { Large, Muted } from '~/components/ui/typography';
import { statusColorMap } from '~/lib/constants';
import { Ticket } from '~/lib/icons/Ticket';
import AgbayEvent from '~/lib/types/agbay-event';
import Attendee from '~/lib/types/attendee';

export default function AttendeeCard({
  event,
  attendee,
}: {
  event: AgbayEvent | undefined;
  attendee: Attendee | undefined;
}) {
  return (
    <Card className="w-full p-2 rounded-2xl">
      <CardHeader className="items-center">
        <CardTitle className="text-center">{attendee?.name}</CardTitle>
        <CardDescription className="pt-2 text-base font-semibold">
          {event?.name}
        </CardDescription>
      </CardHeader>
      <CardContent className="gap-6">
        <View className="flex-row justify-between gap-4 flex-wrap">
          <View>
            <Muted>Tickets</Muted>
            <View className="flex-row gap-1 items-center">
              <Ticket size={20} className="text-foreground" />
              <Large>x {attendee?.ticketCount}</Large>
            </View>
          </View>
          <View>
            <Muted>Status</Muted>
            <Large className={attendee ? statusColorMap[attendee.status] : ''}>
              {attendee?.status}
            </Large>
          </View>
        </View>
      </CardContent>
    </Card>
  );
}
