import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useLocalSearchParams, useRouter } from 'expo-router';
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

export default function ValidateAttendeeScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [eventId, setEventId] = useState('');
  const queryClient = useQueryClient();
  const router = useRouter();
  const mutation = useMutation({
    mutationFn: (updatedData: Partial<Attendee>) =>
      editAttendee(id, updatedData),
    onSuccess: (attendee) => {
      queryClient.invalidateQueries({
        queryKey: [`events/${attendee?.eventId}`],
      });
      setIsSuccess(true);
      setEventId(attendee?.eventId ?? '');
    },
  });
  const [isSuccess, setIsSuccess] = useState(false);
  const [alreadyAttended, setAlreadyAttended] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleViewEventPress = () => {
    router.replace({
      pathname: '/events/details/[id]',
      params: { id: eventId },
    });
  };

  useEffect(() => {
    setLoading(true);
    getAttendeeById(id)
      .then((attendee) => {
        if (!attendee) return;

        if (attendee.status === AttendeeStatus.Attended) {
          setAlreadyAttended(true);
          setEventId(attendee.eventId);
        } else {
          mutation.mutate({ status: AttendeeStatus.Attended });
        }
      })
      .catch(() => setIsSuccess(false))
      .finally(() => setLoading(false));
  }, []);

  if (loading || mutation.isPending) return <LoadingSpinner />;

  return (
    <View className="flex-1 justify-center p-4 gap-10 bg-secondary">
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

      <Button onPress={handleViewEventPress}>
        <Text>View Event</Text>
      </Button>
    </View>
  );
}
