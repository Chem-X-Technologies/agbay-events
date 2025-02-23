import { useRouter } from 'expo-router';
import { Button } from '~/components/ui/button';
import { Plus } from '~/lib/icons/Plus';

export default function CreateEventButton() {
  const router = useRouter();
  return (
    <Button
      size="icon"
      variant="ghost"
      onPressOut={() => {
        router.push('/events/create-event');
      }}
    >
      <Plus className="text-foreground" size={23} strokeWidth={2} />
    </Button>
  );
}
