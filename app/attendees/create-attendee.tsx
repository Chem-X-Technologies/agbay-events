import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { toast } from 'sonner-native';
import AttendeeForm, {
  AttendeeFormType,
} from '~/components/screens/attendees/AttendeeForm';
import { createAttendee } from '~/lib/services/attendeeService';
import { AttendeeStatus, CreateAttendee } from '~/lib/types/attendee';

export default function CreateAttendeeScreen() {
  const { eventId } = useLocalSearchParams<{ eventId: string }>();
  const router = useRouter();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: createAttendee,
    onSuccess: (attendee) => {
      queryClient.invalidateQueries({
        queryKey: [`attendees?eventId=${eventId}`],
      });
      toast.success('Ticket Sale logged successfully!');
      router.replace({
        pathname: '/attendees/details/[id]',
        params: { id: attendee.id },
      });
    },
    onError: (error) => {
      toast.error(`Failed to log ticket sale: ${error.message}`);
    },
  });

  const handleSubmit = (values: AttendeeFormType) => {
    const attendee: CreateAttendee = {
      name: values.name,
      ticketCount: values.ticketCount,
      status: values.status as AttendeeStatus,
      eventId: eventId as string,
      metadata: values.metadata
        .filter((md) => !md.isDeleted)
        .map((md) => ({
          key: md.key,
          value: md.value,
        })),
    };

    mutation.mutate(attendee);
  };

  return <AttendeeForm onSubmit={handleSubmit} loading={mutation.isPending} />;
}
