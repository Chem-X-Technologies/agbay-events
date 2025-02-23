import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useGlobalSearchParams, useRouter } from 'expo-router';
import { toast } from 'sonner-native';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '~/components/ui/alert-dialog';
import { Text } from '~/components/ui/text';
import { deleteEvent } from '~/lib/services/eventService';

export default function DeleteEventConfirmationDialog() {
  const { id, showDeleteConfirmation } = useGlobalSearchParams<{
    id: string;
    showDeleteConfirmation: string;
  }>();
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

  const hideDialog = () => {
    router.setParams({ showDeleteConfirmation: 'false' });
  };

  const handleConfirm = () => {
    mutation.mutate(id);
  };

  return (
    <AlertDialog open={showDeleteConfirmation === 'true'}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Event</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete this event?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex-row gap-4">
          <AlertDialogCancel
            className="flex-1"
            onPress={hideDialog}
            disabled={mutation.isPending}
          >
            <Text>Cancel</Text>
          </AlertDialogCancel>
          <AlertDialogAction
            className="flex-1"
            onPress={handleConfirm}
            loading={mutation.isPending}
          >
            <Text>Continue</Text>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
