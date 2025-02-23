import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { View } from 'react-native';
import LoadingSpinner from '~/components/shared/LoadingSpinner';
import { CheckCircle2 } from '~/lib/icons/CheckCircle2';
import { XCircle } from '~/lib/icons/XCircle';
import { Button } from '~/components/ui/button';
import { editAttendee } from '~/lib/services/attendeeService';
import Attendee, { AttendeeStatus } from '~/lib/types/attendee';
import { Text } from '~/components/ui/text';
import { Card, CardHeader, CardTitle } from '~/components/ui/card';

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

  useEffect(() => {
    mutation.mutate({ status: AttendeeStatus.Attended });
  }, []);

  const handleViewEventPress = () => {
    router.replace({
      pathname: '/events/details/[id]',
      params: { id: eventId },
    });
  };

  return (
    <View className="flex-1 justify-center p-4 gap-10 bg-secondary">
      {mutation.isPending ? (
        <LoadingSpinner />
      ) : (
        <>
          <Card className="w-full p-2 rounded-2xl">
            <CardHeader className="items-center gap-4">
              {isSuccess ? (
                <CheckCircle2 size={60} className="text-green-400" />
              ) : (
                <XCircle size={60} className="text-red-400" />
              )}
              <CardTitle className="text-center">
                {isSuccess
                  ? 'Ticket validated successfully!'
                  : 'Ticket validation failed. Kindly try again.'}
              </CardTitle>
            </CardHeader>
          </Card>

          <Button onPress={handleViewEventPress}>
            <Text>View Event</Text>
          </Button>
        </>
      )}
    </View>
  );
}
