import OptionsDropdownMenu from '~/components/shared/OptionsDropdownMenu';
import EditEventButton from './EditEventButton';
import { DropdownMenuSeparator } from '~/components/ui/dropdown-menu';
import DeleteButton from '~/components/shared/DeleteButton';

export default function EventOptions() {
  return (
    <OptionsDropdownMenu>
      <EditEventButton />
      <DropdownMenuSeparator />
      <DeleteButton />
    </OptionsDropdownMenu>
  );
}
