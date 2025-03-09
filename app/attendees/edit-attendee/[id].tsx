import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { toast } from 'sonner-native';
import AttendeeForm, {
  AttendeeFormType,
} from '~/components/screens/attendees/AttendeeForm';
import LoadingSpinner from '~/components/shared/LoadingSpinner';
import { editAttendee, getAttendeeById } from '~/lib/services/attendeeService';
import { AttendeeStatus, EditAttendee } from '~/lib/types/attendee';

export default function EditAttendeeScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (payload: { id: string; attendee: EditAttendee }) =>
      editAttendee(payload.id, payload.attendee),
    onSuccess: (attendee) => {
      queryClient.invalidateQueries({
        queryKey: [`attendees/${attendee?.id}`],
      });
      queryClient.invalidateQueries({
        queryKey: [`attendees?eventId=${attendee?.eventId}`],
      });
      toast.success('Ticket Sale updated successfully!');
      router.back();
    },
    onError: (error) => {
      toast.error(`Failed to update ticket sale: ${error.message}`);
    },
  });
  const { data, isFetching } = useQuery({
    queryKey: [`edit-attendee/${id}`],
    queryFn: () => getAttendeeById(id),
  });

  const handleSubmit = (values: AttendeeFormType) => {
    const attendee: EditAttendee = {
      name: values.name,
      ticketCount: values.ticketCount,
      status: values.status as AttendeeStatus,
      metadata: values.metadata
        .filter((md) => !md.isDeleted)
        .map((md) => ({
          key: md.key,
          value: md.value,
        })),
    };

    mutation.mutate({ id, attendee });
  };

  if (isFetching) return <LoadingSpinner />;

  return (
    <AttendeeForm
      onSubmit={handleSubmit}
      loading={mutation.isPending}
      defaultValue={data}
    />
  );
}
