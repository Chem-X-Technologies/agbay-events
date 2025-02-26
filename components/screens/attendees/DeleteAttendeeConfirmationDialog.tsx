import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { toast } from 'sonner-native';
import DeleteConfirmationDialog from '~/components/shared/DeleteConfirmationDialog';
import { deleteAttendee } from '~/lib/services/attendeeService';

export default function DeleteAttendeeConfirmationDialog() {
  const { id, eventId } = useLocalSearchParams<{
    id: string;
    eventId: string;
  }>();
  const router = useRouter();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (payload: { id: string; eventId: string }) =>
      deleteAttendee(payload.id).then(() => payload.eventId),
    onSuccess: (eventId) => {
      queryClient.invalidateQueries({
        queryKey: [`attendees?eventId=${eventId}`],
      });
      toast.success('Ticket sale deleted successfully!');
      router.back();
    },
    onError: (error) => {
      toast.error(`Failed to delete ticket sale: ${error.message}`);
    },
  });

  const handleConfirm = () => {
    mutation.mutate({ id, eventId });
  };

  return (
    <DeleteConfirmationDialog
      title="Delete Ticket Sale"
      description="Are you sure you want to delete this ticket sale?"
      loading={mutation.isPending}
      onConfirm={handleConfirm}
    />
  );
}
