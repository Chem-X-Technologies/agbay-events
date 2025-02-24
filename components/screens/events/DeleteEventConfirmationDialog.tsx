import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { toast } from 'sonner-native';
import DeleteConfirmationDialog from '~/components/shared/DeleteConfirmationDialog';
import { deleteEvent } from '~/lib/services/eventService';

export default function DeleteEventConfirmationDialog() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (id: string) => deleteEvent(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['events'] });
      toast.success('Event deleted successfully!');
      router.back();
    },
    onError: (error) => {
      toast.error(`Failed to delete event: ${error.message}`);
    },
  });

  const handleConfirm = () => {
    mutation.mutate(id);
  };

  return (
    <DeleteConfirmationDialog
      title="Delete Event"
      description="Are you sure you want to delete this event?"
      loading={mutation.isPending}
      onConfirm={handleConfirm}
    />
  );
}
