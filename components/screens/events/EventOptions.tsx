import OptionsDropdownMenu from '~/components/shared/OptionsDropdownMenu';
import EditEventButton from './EditEventButton';
import DeleteEventButton from './DeleteEventButton';
import { DropdownMenuSeparator } from '~/components/ui/dropdown-menu';

export default function EventOptions() {
  return (
    <OptionsDropdownMenu>
      <EditEventButton />
      <DropdownMenuSeparator />
      <DeleteEventButton />
    </OptionsDropdownMenu>
  );
}
