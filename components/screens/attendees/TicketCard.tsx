import { View } from 'react-native';
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card';
import { Separator } from '~/components/ui/separator';
import { Large, P } from '~/components/ui/typography';
import { Calendar } from '~/lib/icons/Calendar';
import { Clock } from '~/lib/icons/Clock';
import { MapPin } from '~/lib/icons/MapPin';
import { User } from '~/lib/icons/User';
import { Ticket } from '~/lib/icons/Ticket';
import AgbayEvent from '~/lib/types/agbay-event';
import Attendee from '~/lib/types/attendee';
import { formatDate, formatPeso, formatTime } from '~/lib/utils';

export default function TicketCard({
  event,
  attendee,
}: {
  event: AgbayEvent | undefined;
  attendee: Attendee | undefined;
}) {
  return (
    <Card className="w-full p-2 rounded-2xl">
      <CardHeader className="items-center">
        <CardTitle className="text-center">{event?.name}</CardTitle>
        {/* <CardDescription className="pt-2 text-base font-semibold">
          {event?.name}
        </CardDescription> */}
      </CardHeader>
      <CardContent className="gap-4">
        <View className="flex-row justify-between gap-4 flex-wrap">
          <View>
            <Large className="text-muted-foreground">
              <Calendar className="text-muted-foreground" size={15} />
              {` ${event?.date ? formatDate(event.date) : ''}`}
            </Large>
            <Large className="text-muted-foreground">
              <Clock className="text-muted-foreground" size={15} />
              {` ${event?.time ? formatTime(event?.time) : ''}`}
            </Large>
            <Large className="text-muted-foreground">
              <MapPin className="text-muted-foreground" size={15} />
              {` ${event?.venue}`}
            </Large>
          </View>
          <View>
            <Large className="text-muted-foreground">
              <User className="text-muted-foreground" size={15} />
              {` ${attendee?.name}`}
            </Large>
            <Large className="text-muted-foreground">
              <Ticket className="text-muted-foreground" size={15} /> Ticket(s)
            </Large>
            <Large>{`${formatPeso(event?.ticketPrice ?? 0)} x ${
              attendee?.ticketCount
            }`}</Large>
          </View>
        </View>
        {!!attendee?.metadata?.length && (
          <>
            <Separator />
            <View>
              {attendee.metadata.map((meta, index) => (
                <View className="flex-row gap-1" key={index}>
                  <P className="text-muted-foreground">{meta.key}</P>
                  <P className="font-bold text-muted-foreground">
                    {meta.value}
                  </P>
                </View>
              ))}
            </View>
          </>
        )}
      </CardContent>
    </Card>
  );
}
