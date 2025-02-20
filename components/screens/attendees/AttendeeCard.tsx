import { useQuery } from '@tanstack/react-query';
import { useLocalSearchParams } from 'expo-router';
import { View } from 'react-native';
import LoadingSpinner from '~/components/shared/LoadingSpinner';
import { Button } from '~/components/ui/button';
import { Text } from '~/components/ui/text';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '~/components/ui/card';
import { Large, Muted } from '~/components/ui/typography';
import { statusColorMap } from '~/lib/constants';
import { Ticket } from '~/lib/icons/Ticket';
import { getAttendeeById } from '~/lib/services/attendeeService';
import { getEventById } from '~/lib/services/eventService';

const fetchData = async (attendeeId: string) => {
  const attendee = await getAttendeeById(attendeeId);
  const event = await getEventById(attendee?.eventId ?? '');
  return { attendee, event };
};

export default function AttendeeCard() {
  const { id } = useLocalSearchParams();
  const { data, isFetching } = useQuery({
    queryKey: [`attendees/${id}`],
    queryFn: () => fetchData(id as string),
  });

  if (isFetching) return <LoadingSpinner />;

  if (!data) return <></>;

  const { attendee, event } = data;

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
      <CardFooter className="flex-col gap-3">
        <Button
          className="shadow shadow-foreground/5"
          // onPress={updateProgressValue}
        >
          <Text>View QR Code</Text>
        </Button>
      </CardFooter>
    </Card>
  );
}
