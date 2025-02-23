import { useLocalSearchParams, useRouter } from 'expo-router';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '../ui/alert-dialog';
import { Text } from '../ui/text';

export default function DeleteConfirmationDialog({
  title,
  description,
  loading,
  onConfirm,
}: {
  title: string;
  description: string;
  loading: boolean;
  onConfirm: () => void;
}) {
  const { showDeleteConfirmation } = useLocalSearchParams<{
    showDeleteConfirmation: string;
  }>();
  const router = useRouter();

  const hideDialog = () => {
    router.setParams({ showDeleteConfirmation: 'false' });
  };

  return (
    <AlertDialog open={showDeleteConfirmation === 'true'}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex-row gap-4">
          <AlertDialogCancel
            className="flex-1"
            onPress={hideDialog}
            disabled={loading}
          >
            <Text>Cancel</Text>
          </AlertDialogCancel>
          <AlertDialogAction
            className="flex-1"
            onPress={onConfirm}
            loading={loading}
          >
            <Text>Continue</Text>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
