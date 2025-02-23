import OptionsDropdownMenu from '~/components/shared/OptionsDropdownMenu';
import { DropdownMenuSeparator } from '~/components/ui/dropdown-menu';
import EditAttendeeButton from './EditAttendeeButton';
import ShareTicketButton from './ShareTicketButton';

export default function AttendeeOptions({ onShare }: { onShare: () => void }) {
  return (
    <OptionsDropdownMenu>
      <ShareTicketButton onPress={onShare} />
      <DropdownMenuSeparator />
      <EditAttendeeButton />
      {/* <DropdownMenuSeparator />
      <DeleteEventButton /> */}
    </OptionsDropdownMenu>
  );
}
