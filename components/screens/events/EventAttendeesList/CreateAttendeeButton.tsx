import { Link, useLocalSearchParams, useRouter } from 'expo-router';
import { Button } from '~/components/ui/button';
import { Plus } from '~/lib/icons/Plus';

export default function CreateAttendeeButton() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  return (
    // <Link asChild href="/events/create-event">
    <Button
      size="icon"
      variant="ghost"
      onPressOut={() => {
        router.push({
          pathname: '/attendees/create-attendee',
          params: { eventId: id },
        });
      }}
    >
      <Plus className="text-foreground" size={23} strokeWidth={2} />
    </Button>
    // </Link>
  );
}
