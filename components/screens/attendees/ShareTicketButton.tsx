import { Button } from '~/components/ui/button';
import { Share2 } from '~/lib/icons/Share2';

export default function ShareTicketButton({
  onPress,
}: {
  onPress: () => void;
}) {
  return (
    <Button size="icon" variant="ghost" onPressOut={onPress}>
      <Share2 className="text-foreground" size={23} strokeWidth={2} />
    </Button>
  );
}
