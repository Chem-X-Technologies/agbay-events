import { Link } from 'expo-router';
import { Button } from '~/components/ui/button';
import { Plus } from '~/lib/icons/Plus';

export default function CreateEventButton() {
  return (
    <Link href="/events/create-event" asChild>
      <Button size="icon" variant="ghost">
        <Plus className="text-foreground" size={23} strokeWidth={2} />
      </Button>
    </Link>
  );
}
