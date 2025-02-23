import { DropdownMenuItem } from '~/components/ui/dropdown-menu';
import { Share2 } from '~/lib/icons/Share2';

export default function ShareTicketButton({
  onPress,
}: {
  onPress: () => void;
}) {
  return (
    <DropdownMenuItem onPress={onPress}>
      <Share2 className="text-foreground" size={23} strokeWidth={2} />
    </DropdownMenuItem>
  );
}
