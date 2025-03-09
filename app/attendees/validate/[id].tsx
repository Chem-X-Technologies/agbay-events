import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Link, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { View } from 'react-native';
import LoadingSpinner from '~/components/shared/LoadingSpinner';
import { CheckCircle2 } from '~/lib/icons/CheckCircle2';
import { XCircle } from '~/lib/icons/XCircle';
import { Button } from '~/components/ui/button';
import { editAttendee, getAttendeeById } from '~/lib/services/attendeeService';
import Attendee, { AttendeeStatus } from '~/lib/types/attendee';
import { Text } from '~/components/ui/text';
import { Card, CardHeader, CardTitle } from '~/components/ui/card';
import { Info } from '~/lib/icons/Info';
import TicketCard from '~/components/screens/attendees/TicketCard';
import { getEventById } from '~/lib/services/eventService';
import AgbayEvent from '~/lib/types/agbay-event';
import { ImageBackground } from 'expo-image';
import { cn } from '~/lib/utils';

const fetchData = async (attendeeId: string) => {
  const attendee = await getAttendeeById(attendeeId);
  const event = await getEventById(attendee?.eventId ?? '');
  return { attendee, event };
};

export default function ValidateAttendeeScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [isSuccess, setIsSuccess] = useState(false);
  const [alreadyAttended, setAlreadyAttended] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<{
    attendee?: Attendee;
    event?: AgbayEvent;
  }>();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (updatedData: Partial<Attendee>) =>
      editAttendee(id, updatedData),
    onSuccess: (attendee) => {
      queryClient.invalidateQueries({
        queryKey: [`events/${attendee?.eventId}`],
      });
      setIsSuccess(true);
    },
    onError: (error) => {
      console.error(`Failed to update ticket status: ${error.message}`);
      setIsSuccess(false);
    },
  });

  useEffect(() => {
    setLoading(true);
    fetchData(id)
      .then((data) => {
        if (!data?.attendee) return;

        if (data.attendee.status === AttendeeStatus.Attended) {
          setAlreadyAttended(true);
        } else {
          mutation.mutate({ status: AttendeeStatus.Attended });
        }

        setData(data);
      })
      .catch((err) => {
        console.error(`Failed to fetch data: ${err.message}`);
        setIsSuccess(false);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading || mutation.isPending) return <LoadingSpinner />;

  return !!data?.event?.poster?.url ? (
    <ImageBackground
      source={{ uri: data.event.poster.url }}
      contentFit="cover"
      style={{ flex: 1 }}
    >
      <ValidateAttendeeScreenContent
        alreadyAttended={alreadyAttended}
        isSuccess={isSuccess}
        data={data}
      />
    </ImageBackground>
  ) : (
    <ValidateAttendeeScreenContent
      alreadyAttended={alreadyAttended}
      isSuccess={isSuccess}
      data={data}
      className="bg-secondary"
    />
  );
}

const ValidateAttendeeScreenContent = ({
  alreadyAttended,
  isSuccess,
  data,
  className,
}: {
  alreadyAttended: boolean;
  isSuccess: boolean;
  data?: {
    attendee?: Attendee;
    event?: AgbayEvent;
  };
  className?: string;
}) => {
  return (
    <View className={cn('flex-1 p-4 gap-4', className)}>
      <Card className="w-full p-2 rounded-2xl">
        <CardHeader className="items-center gap-4">
          {alreadyAttended ? (
            <Info size={60} className="text-gray-400" />
          ) : isSuccess ? (
            <CheckCircle2 size={60} className="text-green-400" />
          ) : (
            <XCircle size={60} className="text-red-400" />
          )}
          <CardTitle
            className={`text-center ${
              alreadyAttended
                ? 'text-gray-400'
                : isSuccess
                ? 'text-green-500'
                : 'text-red-500'
            }`}
          >
            {alreadyAttended
              ? 'Ticket was already validated before'
              : isSuccess
              ? 'Ticket validated successfully!'
              : 'Ticket validation failed. Kindly try again.'}
          </CardTitle>
        </CardHeader>
      </Card>
      {!!data?.attendee && !!data?.event && (
        <TicketCard attendee={data.attendee} event={data.event} />
      )}
      <View className="flex-1 justify-end">
        <Link
          href={{
            pathname: '/events/details/[id]',
            params: { id: data?.event?.id ?? '' },
          }}
          asChild
        >
          <Button>
            <Text>View Event</Text>
          </Button>
        </Link>
      </View>
    </View>
  );
};
