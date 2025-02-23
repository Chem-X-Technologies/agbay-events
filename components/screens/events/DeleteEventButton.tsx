import { useRouter } from 'expo-router';
import { DropdownMenuItem } from '~/components/ui/dropdown-menu';
import { Trash2 } from '~/lib/icons/Trash2';

export default function DeleteEventButton() {
  const router = useRouter();

  const showDeleteConfirmation = () => {
    router.setParams({ showDeleteConfirmation: 'true' });
  };

  return (
    <DropdownMenuItem onPress={showDeleteConfirmation}>
      <Trash2 className="text-foreground" size={23} strokeWidth={2} />
    </DropdownMenuItem>
  );
}
