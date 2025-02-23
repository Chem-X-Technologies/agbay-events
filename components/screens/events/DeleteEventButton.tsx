import { DropdownMenuItem } from '~/components/ui/dropdown-menu';
import { Trash2 } from '~/lib/icons/Trash2';

export default function DeleteEventButton() {
  return (
    <DropdownMenuItem onPress={() => {}}>
      <Trash2 className="text-foreground" size={23} strokeWidth={2} />
    </DropdownMenuItem>
  );
}
