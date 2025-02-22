import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { View } from 'react-native';
import LoadingSpinner from '~/components/shared/LoadingSpinner';
import { Large } from '~/components/ui/typography';
import { updateAttendee } from '~/lib/services/attendeeService';
import Attendee, { AttendeeStatus } from '~/lib/types/attendee';

export default function ValidateAttendeeScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (updatedData: Partial<Attendee>) =>
      updateAttendee(id, updatedData),
    onSuccess: (attendee) => {
      queryClient.invalidateQueries({
        queryKey: [`events/${attendee?.eventId}`],
      });
      setIsSuccess(true);
    },
  });
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    mutation.mutate({ status: AttendeeStatus.Attended });
  }, [mutation]);

  return (
    <View className="flex-1 justify-center items-center p-4">
      {mutation.isPending ? (
        <LoadingSpinner />
      ) : isSuccess ? (
        <Large className="text-green-500">Ticket validated successfully!</Large>
      ) : (
        <Large className="text-red-500">
          Ticket validation failed. Kindly try again.
        </Large>
      )}
    </View>
  );
}
