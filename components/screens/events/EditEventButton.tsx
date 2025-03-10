import { useGlobalSearchParams, useRouter } from 'expo-router';
import { Button } from '~/components/ui/button';
import { DropdownMenuItem } from '~/components/ui/dropdown-menu';
import { Text } from '~/components/ui/text';
import { Edit } from '~/lib/icons/Edit';

export default function EditEventButton() {
  const { id } = useGlobalSearchParams<{ id: string }>();
  const router = useRouter();

  return (
    <DropdownMenuItem
      onPress={() => {
        router.push({
          pathname: '/events/edit-event/[id]',
          params: { id },
        });
      }}
    >
      <Edit className="text-foreground" size={23} strokeWidth={2} />
    </DropdownMenuItem>
  );
}
